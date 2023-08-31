<template>
	<v-row>
		<v-col cols="12" sm="6">
			<v-text-field
				class="text-blue-darken-1"
				:label="$t('nameFieldLabel')"
				:rules="[rules.required]"
				validate-on="blur"
				v-model="address.name"
			></v-text-field>
		</v-col>
		<v-col cols="12" sm="6">
			<v-text-field
				class="text-blue-darken-1"
				:label="$t('cepFieldLabel')"
				:rules="[rules.required, rules.counter, rules.found]"
				validate-on="blur"
				counter
				maxlength="9"
				v-model="address.cep"
				@keyup="searchCep"
			></v-text-field>
		</v-col>
	</v-row>
	<v-divider color="blue-darken-1"></v-divider>
	<v-row class="mt-1">
		<v-col cols="12" sm="8">
			<v-text-field
				class="text-blue-darken-1"
				:label="$t('placeFieldLabel')"
				variant="underlined"
				v-model="address.logradouro"
				readonly
			></v-text-field>
		</v-col>
		<v-col>
			<v-text-field
				class="text-blue-darken-1"
				:label="$t('complementFieldLabel')"
				variant="underlined"
				v-model="address.complemento"
				readonly
			></v-text-field>
		</v-col>
	</v-row>
	<v-row>
		<v-col cols="12" sm="5">
			<v-text-field
				class="text-blue-darken-1"
				:label="$t('neighborhoodFieldLabel')"
				variant="underlined"
				v-model="address.bairro"
				readonly
			></v-text-field>
		</v-col>
		<v-col cols="12" sm="5">
			<v-text-field
				class="text-blue-darken-1"
				:label="$t('localityFieldLabel')"
				variant="underlined"
				v-model="address.localidade"
				readonly
			></v-text-field>
		</v-col>
		<v-col cols="12" sm="2">
			<v-text-field
				class="text-blue-darken-1"
				:label="$t('stateFieldLabel')"
				variant="underlined"
				v-model="address.uf"
				readonly
			></v-text-field>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: "AddressFields",
	props: ["address", "searchCep", "found"],
	data() {
		return {
			rules: {
				required: (value) => !!value || this.$t("requiredField"),
				counter: (value) => value.length >= 9 || this.$t("cepInvalid"),
				found: () => this.found || this.$t("cepNotFound"),
			},
		};
	},
};
</script>
