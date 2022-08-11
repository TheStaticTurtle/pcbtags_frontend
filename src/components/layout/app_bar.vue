<template>
    <v-app-bar
            app
            color="primary"
    >
<!--        <template v-slot:image>-->
<!--            <v-img gradient="to top right, rgba(220, 80, 14, 1), rgba(255, 150, 70, 1)"></v-img>-->
<!--        </template>-->

<!--        <template v-slot:prepend>-->
<!--            <v-app-bar-nav-icon></v-app-bar-nav-icon>-->
<!--        </template>-->

        <v-app-bar-title>
            <v-btn class="font-weight-light" style="font-size: 1.2em" variant="text" size="x-large" to="/">
                PcbTags
            </v-btn>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" to="/generate">
            GENERATE
        </v-btn>

        <v-btn icon="mdi-theme-light-dark" color="white" @click="toggleTheme"></v-btn>
    </v-app-bar>
</template>

<script>
	import { useTheme } from 'vuetify'
    import app_bar_bg from "../../assets/pcb.jpg"
    import logo from "../../assets/logo.svg";

	export default {
		name: "app_bar",

		setup () {
			const theme = useTheme()

			return {
				theme,
				toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
			}
		},

        data: () => ({
            app_bar_bg,
        }),
	}
</script>

<style scoped>

</style>