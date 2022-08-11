// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vuetify
import { createVuetify } from 'vuetify'

const customLightTheme = {
	dark: false,
	colors: {
		background: '#FFFFFF',
		surface: '#fcfcfc',
		primary: '#e0380d',
		'primary-darken-1': '#bd3007',
		secondary: '#fc7914',
		'secondary-darken-1': '#fc7914',
		accent: '#e91e63',
		error: '#f44336',
		info: '#03a9f4',
		success: '#4caf50',
		warning: '#ffc107',
		muted: '#999999'
	}
}
const customDarkTheme = {
	dark: true,
	colors: {
		background: '#1b1b1c',
		surface: '#28282B',
		primary: '#0d49e0',
		'primary-darken-1': '#074abd',
		secondary: '#1484fc',
		'secondary-darken-1': '#1471fc',
		accent: '#e91e63',
		error: '#f44336',
		info: '#03a9f4',
		success: '#4caf50',
		warning: '#ffc107',
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
