import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'
import meta from './plugins/meta'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const app = createApp(App)
	.use(vuetify)
	.use(router)
	.use(meta)

await router.isReady()

app.mount('#app')