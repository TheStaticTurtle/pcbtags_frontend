<template>
    <v-app>
<!--        <v-navigation-drawer app>-->
<!--        </v-navigation-drawer>-->

        <app_bar/>

        <v-main>
            <router-view></router-view>
        </v-main>

        <v-footer app absolute  style="font-size: 0.8em;" class="py-1">
            PcbTags - A simple keychain generator
            <v-spacer></v-spacer>
            <a href="https://github.com">Github</a>&nbsp;&nbsp;-&nbsp;&nbsp;<router-link to="/about">About</router-link>

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
        background-color: var(--v-primary-base)
    }
    .bg-secondary {
        background-color: var(--v-secondary-base)
    }
    .text-muted {
        color: var(--v-muted-base)
    }
</style>