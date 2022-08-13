<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4 mx-16">
                <h1 class="display-2 font-weight-bold mb-3">
                    PCBTAGS
                </h1>

                <p class="subheading font-weight-regular mb-5">
                    A simple tool to create customized keychain name tags, spotify code tags, business card, and more with PCBs.<br>
                    This tool will export a gerber file which should be ready for production by all major factories.
                    The PCB generation is based on the KiCad software and allows you to export the .kicad_pcb file in order for you to make edits if you want to
                </p>

                <p class="subheading font-weight-regular mb-5">
                    PCBTAGS server and frontend are licensed under GPLv3 allowing you to extend the capabilities of the projet. You can find both repositories here:
                </p>

                <opengraph_git_images/>


                <p class="subheading font-weight-regular">
                    This instance is usign the frontend version {{frontend_version}} and backend version {{backend_version}}
                </p>
            </v-col>
        </v-row>

        <v-row class="text-center">
            <v-col class="mb-5">
                <h1 class="headline font-weight-bold mb-5">
                    About me
                </h1>

                <p class="subheading font-weight-regular">
                    I'm a software developer, system administrator and enthusiast of many other things. You can find out more about me on my <a href="https://thestaticturtle.fr" target="_blank">website</a> or <a href="https://blog.thestaticturtle.fr" target="_blank">blog</a>
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
	import axios from 'axios'
	import Opengraph_git_images from "../components/about/opengraph_git_images.vue";

	import { useMeta } from 'vue-meta'

	export default {
		setup () {
			useMeta({
				title: 'About',
			})
		},
		name: 'About',
		components: {Opengraph_git_images},
		beforeMount() {
			const t = this;
			axios({
				method: 'get',
				url: "/api/version"
			}).then(function (response) {
				t.backend_version = response.data.data
			});
		},

		data: () => ({
			backend_version: "unknown",
			frontend_version: __APP_VERSION__,
		}),
	}
</script>
