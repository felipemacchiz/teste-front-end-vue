<template>
	<v-app>
		<main id="main">
			<Header />
			<section id="content">
				<router-view />
			</section>
		</main>
	</v-app>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
	data() {
		return {};
	},
	components: {
		Header,
	},
	created() {},
};
</script>

<style>
#main {
	min-height: 100vh;
}

#content {
	margin-top: 96px;
}
</style>
