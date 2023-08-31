<template>
	<v-card class="align-center pa-4">
		<v-card-title>
			{{ $t("deleteDialogTitle") }}
		</v-card-title>

		<v-card-subtitle>
			{{ $t("deleteDialogSubtitle") }}
		</v-card-subtitle>

		<v-card-actions class="mt-8">
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
				variant="elevated"
				:text="$t('buttonDelete')"
				rounded
				@click="deleteAddress"
			/>
		</v-card-actions>
	</v-card>
</template>

<script>
import { api } from "@/services";

export default {
	name: "AddressDelete",
	props: ["id"],
	methods: {
		closeDialog() {},
		deleteAddress() {
			api.delete(`/address/${this.id}`).then(() => {
				this.$store.dispatch("getAddresses");
				this.$emit("close");
			});
		},
	},
};
</script>
