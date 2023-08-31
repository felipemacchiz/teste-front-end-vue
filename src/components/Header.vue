<template>
	<v-app-bar class="text-blue-darken-1">
		<template v-slot:prepend>
			<v-icon icon="mdi-home"></v-icon>
		</template>

		<v-app-bar-title>
			{{ $t("mainTitle") }}
		</v-app-bar-title>

		<template v-slot:append>
			<v-icon icon="mdi-global"></v-icon>
		</template>
	</v-app-bar>
</template>

<script>
export default {
	name: "Header",
};
</script>
