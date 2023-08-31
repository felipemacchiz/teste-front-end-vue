<template>
	<v-card v-if="address" max-width="960" class="w-100 mx-auto">
		<v-form @submit.prevent="handleSave">
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
						v-if="address.id"
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
						type="submit"
						color="teal"
						prepend-icon="mdi-check"
						width="144"
						height="48"
						:text="$t('buttonSave')"
						variant="elevated"
						rounded
					/>
				</v-card-actions>
			</v-container>
		</v-form>
	</v-card>
	<v-dialog width="540" v-model="deleteDialog">
		<AddressDelete :id="address.id" @close="closeDeleteDialog" />
	</v-dialog>
	<v-snackbar
		class="error-snackbar"
		v-model="snackbar"
		color="red-accent-2"
		:timeout="1400"
	>
		{{ $t("invalidFields") }}
	</v-snackbar>
</template>

<script>
import { api, getCep } from "@/services";
import AddressFields from "@/components/AddressFields.vue";
import AddressDelete from "./AddressDelete.vue";
import { th } from "vuetify/lib/locale/index.mjs";

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
			snackbar: false,
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
					name: "",
					cep: this.cep,
				};

				this.searchCep();
			} else {
				this.address = {
					name: "",
					cep: "",
				};
			}
		},
		validate() {
			if (!this.address.name?.length || !this.found) {
				this.snackbar = true;
				return false;
			}

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

					this.found = !data.erro;

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
		closeDeleteDialog() {
			this.deleteDialog = false;
		},
	},
	created() {
		this.getAddress();
	},
};
</script>
