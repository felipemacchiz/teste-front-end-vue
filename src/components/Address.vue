<template>
	<v-card>
		<v-container>
			<address-fields
				:address="address"
				:searchCep="searchCep"
				:found="found"
			></address-fields>
			<v-card-actions class="flex-column flex-sm-row justify-end">
				<v-btn
					color="grey-darken-1"
					width="144"
					height="48"
					prepend-icon="mdi-close"
					variant="text"
					:text="$t('buttonCancel')"
					rounded
					@click="this.$emit('close')"
				/>
				<v-btn
					color="red-accent-2"
					prepend-icon="mdi-trash-can"
					width="144"
					height="48"
					variant="text"
					:text="$t('buttonDelete')"
					rounded
					@click="handleDelete"
				/>
				<v-btn
					color="teal"
					prepend-icon="mdi-check"
					width="144"
					height="48"
					:text="$t('buttonSave')"
					variant="elevated"
					rounded
					@click="handleSave"
				/>
			</v-card-actions>
		</v-container>
	</v-card>
	<v-dialog width="520" v-model="deleteDialog">
		<AddressDelete :id="address.id" />
	</v-dialog>
</template>

<script>
import { api, getCep } from "@/services";
import AddressFields from "@/components/AddressFields.vue";
import AddressDelete from "./AddressDelete.vue";

export default {
	name: "Address",
	props: ["id", "cep"],
	components: {
		AddressFields,
		AddressDelete,
	},
	data() {
		return {
			address: null,
			found: false,
			deleteDialog: false,
		};
	},
	methods: {
		getAddress() {
			if (this.id && !this.cep) {
				api.get(`/address/${this.id}`).then((response) => {
					this.address = response.data;

					this.searchCep();
				});
			} else if (this.cep) {
				this.address = {
					cep: this.cep,
				};

				this.searchCep();
			} else {
				this.address = {};
			}
		},
		validate() {
			if (!this.address.name?.length) return false;
			if (!this.found) return false;

			this.address.cep = this.address.cep.replace(/\D/g, "");
			this.address.modifiedAt = new Date().toISOString();

			return true;
		},
		editAddress() {
			if (!this.validate()) return;

			api.put(`/address/${this.address.id}`, this.address).then(() => {
				this.$store.dispatch("getAddresses");
				this.$emit("close");
			});
		},
		addAddress() {
			if (!this.validate()) return;

			this.address.createdAt = new Date().toISOString();

			api.post("/address", this.address).then(() => {
				this.$store.dispatch("getAddresses");
				this.$emit("close");
			});
		},
		handleDelete() {
			this.deleteDialog = true;
		},
		handleSave() {
			if (this.id) {
				this.editAddress();
			} else {
				this.addAddress();
			}
		},
		searchCep() {
			const value = this.address.cep.replace(/\D/g, "");

			if (value.length === 8) {
				getCep(value).then((response) => {
					const data = response.data;

					this.found = !!data;

					this.address.logradouro = data.logradouro;
					this.address.complemento = data.complemento;
					this.address.bairro = data.bairro;
					this.address.localidade = data.localidade;
					this.address.uf = data.uf;
				});
			} else {
				this.address.logradouro = "";
				this.address.complemento = "";
				this.address.bairro = "";
				this.address.localidade = "";
				this.address.uf = "";

				this.found = false;
			}

			if (value.length > 5)
				this.address.cep = `${value?.slice(0, 5)}-${value?.slice(5)}`;
			else this.address.cep = value;
		},
	},
	created() {
		this.getAddress();
	},
};
</script>
