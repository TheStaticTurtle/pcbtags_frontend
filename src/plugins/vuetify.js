// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vuetify
import { createVuetify } from 'vuetify'

// const customLightTheme = {
// 	dark: false,
// 	colors: {
// 		background: '#FFFFFF',
// 		surface: '#fcfcfc',
// 		primary: '#e0380d',
// 		'primary-darken-1': '#bd3007',
// 		secondary: '#fc7914',
// 		'secondary-darken-1': '#fc7914',
// 		accent: '#e91e63',
// 		error: '#f44336',
// 		info: '#03a9f4',
// 		success: '#4caf50',
// 		warning: '#ffc107',
// 		muted: '#999999'
// 	}
// }
const customLightTheme = {
	dark: false,
	colors: {
		background: '#FFFFFF',
		surface: '#fcfcfc',

		primary: '#546e7a',
		'primary-lighten-1': '#819ca9',
		'primary-darken-1': '#29434e',
		secondary: '#42a5f5',
		'secondary-lighten-1': '#80d6ff',
		'secondary-darken-1': '#0077c2',

		error: '#e74f48',
		info: '#80d6ff',
		success: '#7cb342',
		warning: '#FF7900',

		accent: '#42A5F5',
		anchor: '#42A5F5',
		muted: '#999999'
	}
}
const customDarkTheme = {
	dark: true,

	colors: {
		background: '#424242',
		surface: '#373737',

		primary: '#546e7a',
		'primary-lighten-1': '#819ca9',
		'primary-darken-1': '#29434e',
		secondary: '#42a5f5',
		'secondary-lighten-1': '#80d6ff',
		'secondary-darken-1': '#0077c2',

		error: '#e74f48',
		info: '#80d6ff',
		success: '#7cb342',
		warning: '#FF7900',

		accent: '#42A5F5',
		anchor: '#42A5F5',
		muted: '#999999'
	}
}

export default createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'light',
		themes: {
			light: customLightTheme,
			dark: customDarkTheme,
		}
	}
})
