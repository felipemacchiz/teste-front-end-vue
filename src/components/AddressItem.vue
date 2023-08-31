<template>
	<v-sheet color="transparent" class="w-100" v-if="address">
		<div class="d-flex align-center justify-space-between">
			<div>
				<h2>{{ address.name }}</h2>
				<p>
					{{ `${address.cep?.slice(0, 5)}-${address.cep?.slice(5)}` }}
				</p>
			</div>
			<div>
				<v-btn
					color="blue-darken-1"
					icon="mdi-pencil"
					variant="text"
					rounded="xl"
					@click="editDialog = true"
				/>
				<v-btn
					color="red-accent-2"
					icon="mdi-trash-can"
					variant="text"
					rounded="xl"
					@click="deleteDialog = true"
				/>
			</div>
		</div>
	</v-sheet>
	<v-dialog v-model="editDialog">
		<Address :id="address.id" @close="closeEditDialog" />
	</v-dialog>
	<v-dialog width="540" v-model="deleteDialog">
		<AddressDelete :id="address.id" @close="closeDeleteDialog" />
	</v-dialog>
</template>

<script>
import Address from "@/components/Address.vue";
import AddressDelete from "./AddressDelete.vue";

export default {
	name: "AddressItem",
	props: ["address"],
	components: {
		Address,
		AddressDelete,
	},
	data() {
		return {
			editDialog: false,
			deleteDialog: false,
		};
	},
	methods: {
		closeEditDialog() {
			this.editDialog = false;
		},
		closeDeleteDialog() {
			this.deleteDialog = false;
		},
	},
};
</script>
