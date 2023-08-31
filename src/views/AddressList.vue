<template>
	<v-responsive max-width="480" class="mx-auto mb-8">
		<v-container>
			<v-row justify="center" class="mb-3">
				<h2 class="text-center">
					{{ $t("title") }}
				</h2>
			</v-row>
			<v-row>
				<v-text-field
					:label="$t('inputFieldPlaceholder')"
					prepend-inner-icon="mdi-map-marker"
					bg-color="blue-darken-1"
					rounded
					variant="solo-filled"
					id="cep"
					v-model="cep"
					counter
					maxlength="9"
					autocomplete="off"
					@keyup="search"
					single-line
					hide-details
					append-inner-icon="mdi-plus-circle"
					@click:append-inner="addressCreate"
				/>
			</v-row>
		</v-container>
	</v-responsive>
	<v-responsive max-width="580" class="mx-auto">
		<v-container v-if="addresses?.length">
			<div
				v-for="(addressItem, index) in addresses"
				:key="addressItem.id"
			>
				<v-divider v-if="index" class="my-3" />
				<address-item :address="addressItem" />
			</div>
		</v-container>
		<v-container v-else>
			<v-row justify="center" class="mb-5">
				<v-alert
					:text="cep ? $t('emptySearchAlert') : $t('emptyAlert')"
					color="transparent"
					class="text-orange-darken-2"
					icon="$warning"
				/>
			</v-row>
			<v-row justify="center">
				<v-btn
					size="large"
					color="teal"
					width="320"
					height="48"
					rounded="xl"
					prepend-icon="mdi-plus-circle"
					:text="$t('buttonAddAddress')"
					@click="addressCreate"
				/>
			</v-row>
		</v-container>
	</v-responsive>
	<v-dialog v-model="dialog">
		<Address :cep="cep" @close="closeDialog" />
	</v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Address from "@/components/Address.vue";
import AddressItem from "@/components/AddressItem.vue";

export default {
	name: "Home",
	data() {
		return {
			cep: "",
			address: null,
			dialog: false,
		};
	},
	components: {
		Address,
		AddressItem,
	},
	computed: {
		...mapState(["addresses"]),
	},
	methods: {
		...mapActions(["getAddresses"]),
		search() {
			const value = this.cep.replace(/\D/g, "");
			this.getAddresses(value);

			if (value.length > 5)
				this.cep = `${value?.slice(0, 5)}-${value?.slice(5)}`;
			else this.cep = value;
		},
		addressCreate() {
			this.address = {
				cep: this.cep,
			};

			this.dialog = true;
		},
		closeDialog() {
			this.dialog = false;
		},
	},
	created() {
		this.getAddresses();
	},
};
</script>
