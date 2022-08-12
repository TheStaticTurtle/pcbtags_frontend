<template>
    <v-app>
        <app_bar/>

        <v-main>
            <router-view></router-view>
        </v-main>

        <app_footer></app_footer>
    </v-app>
</template>

<script>
	import Index from './pages/Index.vue'
	import App_bar from "./components/layout/app_bar.vue";
	import App_footer from "./components/layout/app_footer.vue";

	export default {
		name: 'App',

		components: {
			App_footer,
			App_bar,
			Index,
		},

		data: () => ({
			//
		}),
	}
</script>

<style>
    .child-no-padding > div {
        padding: 0;
    }

    .bg-primary {
        background-color: rgb(var(--v-theme-primary));
    }
    .bg-secondary {
        background-color: rgb(var(--v-theme-secondary));
    }
    .text-muted {
        color: rgb(var(--v-theme-muted));
    }
    .text-small {
        font-size: 0.85em;
    }
    a {
        color: rgb(var(--v-theme-anchor));
    }
</style>