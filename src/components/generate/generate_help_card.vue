<template>
    <v-card class="mb-3">
        <v-card-title class="text-center bg-primary justify-center pa-0 py-1">
            <h3 class="font-weight-light">Help</h3>
        </v-card-title>
        <div class="pa-3">
            To generate a tag, you first need to decide what you want to generate there are a few options available:
            <ul v-if="!loading_generators" class="ml-8 my-2">
                <li v-for="generator in generators" :key="generator.key">
                    {{generator.name}}: {{generator.short_desc}}
                </li>
            </ul>
            <ul v-else class="ml-8 my-2">
                <li><v-progress-circular indeterminate color="accent"/> </li>
            </ul>
            <p class="mb-2">
                Then you will need to choose the color used for the preview, the color will be the color of the solder mask.
                ENIG means gold-plated and HASL mean tinned.
                This option is only used for the preview and you will need to re-select it when ordering to a fab house.
            </p>
            <p class="mb-2">
                Next, you will have to fill the options for the generator you selected. For example, using the spotify generator, you will need to:
            </p>
            <ul class="ml-8 my-2">
                <li>Select the keychain format</li>
                <li>Enter either a Spotify URI <span class="text-muted text-small">spotify:track:4cOdK2wGLETKBW3PvgPWqT</span> or the Spotify share URL <span class="text-muted text-small">https://open.spotify.com/track/1vUOJpWc091SBYULNvz9mp</span></li>
                <li>Select whether you want the logo or not</li>
                <li>Select whether you want a hole for the keychain</li>
            </ul>
            <p class="mb-2">
                Finally, you can hit the Generate button and after a brief moment you will be able to see a render of the PCB as well as different export methods
            </p>
        </div>
    </v-card>
</template>

<script>
	import axios from 'axios'

	export default {
		name: "generate_help_card",

		data: () => ({
			loading_generators: true,
			generators: [],
		}),

		beforeMount() {
			const t = this;
			axios({
				method: 'get',
				url: "/api/generators"
			}).then(function (generators_response) {
				t.generators = generators_response.data.generators
				t.loading_generators = false
			});
		},
	}
</script>

<style scoped>

</style>