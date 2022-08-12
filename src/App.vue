<template>
    <v-app>
<!--        <v-navigation-drawer app>-->
<!--        </v-navigation-drawer>-->

        <app_bar/>

        <v-main>
            <router-view></router-view>
        </v-main>

        <v-footer app absolute color="primary-darken-1"  style="font-size: 0.8em;" class="py-1">
            PcbTags - A simple keychain generator
            <v-spacer></v-spacer>
            <router-link to="/about">About</router-link>

        </v-footer>
    </v-app>
</template>

<script>
	import Index from './pages/Index.vue'
	import App_bar from "./components/layout/app_bar.vue";

	export default {
		name: 'App',

		components: {
			App_bar,
			Index,
		},

		data: () => ({
			//
		}),
	}
</script>

<style>
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