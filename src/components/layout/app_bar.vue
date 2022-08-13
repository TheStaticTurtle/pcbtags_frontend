<template>
    <v-app-bar
            app
            color="primary"
    >
<!--        <template v-slot:image>-->
<!--            <v-img gradient="to top right, rgba(220, 80, 14, 1), rgba(255, 150, 70, 1)"></v-img>-->
<!--        </template>-->

        <template v-slot:prepend>
        </template>

        <div class="d-flex mx-5 align-center" >
            <v-icon size="x-large" class="mr-4">mdi-tag-text</v-icon>
            <router-link class="font-weight-light text-decoration-none pa-0 ma-0" style="font-size: 1.75em; color: white" variant="text" to="/">
                PCBTAGS
            </router-link>
        </div>

        <v-spacer></v-spacer>

        <v-btn variant="text" to="/generate">
            GENERATE
        </v-btn>

        <v-btn icon="mdi-theme-light-dark" color="white" @click="toggleTheme"></v-btn>
    </v-app-bar>
</template>

<script>
	import { useTheme } from 'vuetify'

	export default {
		name: "app_bar",

		setup () {
			const theme = useTheme()

			return {
				theme,
				toggleTheme: () => {
					theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
					localStorage.setItem("enable_dark_mode", theme.global.current.value.dark);
				}
			}
		},

        data: () => ({
        }),

        beforeMount() {
	        const dark_mode = localStorage.getItem("enable_dark_mode");
	        if(dark_mode === "true") {
		        this.toggleTheme()
	        }
        }
	}
</script>

<style scoped>

</style>