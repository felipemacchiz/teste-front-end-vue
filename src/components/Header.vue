<template>
	<v-app-bar class="text-blue-darken-1">
		<template v-slot:prepend>
			<v-icon icon="mdi-home" />
		</template>

		<v-app-bar-title prepend-icon="mdi-home" :text="$t('mainTitle')" />

		<v-spacer></v-spacer>

		<v-btn variant="text">
			<v-icon icon="mdi-earth" />
			<v-menu activator="parent">
				<v-list>
					<v-list-item
						v-for="lang in languages"
						:key="lang.name"
						:value="lang.name"
						@click="changeLocale(lang.name)"
					>
						<v-list-item-title>{{ lang.label }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-btn>
	</v-app-bar>
</template>

<script>
export default {
	name: "Header",
	data() {
		return {
			languages: [
				{
					name: "ptBr",
					label: this.$t("portuguese"),
				},
				{
					name: "en",
					label: this.$t("english"),
				},
			],
		};
	},
	methods: {
		changeLocale(lang) {
			this.$i18n.locale = lang;
			localStorage.setItem("locale", lang);
		},
	},
};
</script>
