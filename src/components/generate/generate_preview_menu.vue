<template>
    <v-card class="mb-3">
        <v-card-title class="text-center bg-primary justify-center pa-0 pt-1">
            <h3 class="font-weight-light">Preview</h3>
        </v-card-title>
        <v-tabs grow v-model="preview_tab" background-color="primary" dark density="compact">
            <v-tab value="toplayer">Top Layer</v-tab>
            <v-tab value="bottomlayer">Bottom Layer</v-tab>
            <!--                        <v-tab value="3d">3D Model</v-tab>-->
        </v-tabs>
        <v-window v-model="preview_tab" >
            <v-window-item value="toplayer">
                <v-card class="pa-3">
                    <v-img :src="svg_top_layer_render" style="width: 100%; border-radius: 16px"></v-img>
                    <p class="text-muted text-small">
                        <v-icon size="small">mdi-information</v-icon> SVG Renders might not be entirely correct. To be sure, download the gerber and open it in a software like gerbview
                    </p>
                </v-card>
            </v-window-item>
            <v-window-item value="bottomlayer">
                <v-card class="pa-3">
                    <v-img :src="svg_bottom_layer_render" style="width: 100%; border-radius: 16px"></v-img>
                    <p class="text-muted text-small">
                        <v-icon size="small">mdi-information</v-icon> SVG Renders might not be entirely correct. To be sure, download the gerber and open it in a software like gerbview
                    </p>
                </v-card>
            </v-window-item>
            <!--                        <v-window-item value="3d">-->
            <!--                            <v-card class="pa-3">-->
            <!--                                3D render is not available yet-->
            <!--                            </v-card>-->
            <!--                        </v-window-item>-->
        </v-window>
    </v-card>
</template>

<script>
	export default {
		name: "generate_preview_menu",

		props: {
			data: {
				type: Object,
				required: true
			},
		},

        computed: {
	        svg_top_layer_render() {
                return "data:image/svg+xml;base64,"+btoa(this.data.gerber.top)
	        },
	        svg_bottom_layer_render() {
		        return "data:image/svg+xml;base64,"+btoa(this.data.gerber.bottom)
	        },
        },

		data: () => ({
			preview_tab: null,
		}),
	}
</script>

<style scoped>

</style>