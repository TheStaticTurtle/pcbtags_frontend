<template>
    <v-container fluid class="pa-md-8">
        <v-row>
            <v-col cols="12" sm="6" md="5" >
                <v-card class="mb-3">
                    <v-card-title class="text-center bg-primary justify-center pa-0 py-1">
                        <h3 class="font-weight-light">Settings</h3>
                    </v-card-title>
                    <div class="pa-3">
                        <v-select
                                :items="generators"
                                v-model="selected_generator"
                                item-title="text"
                                item-value="value"
                                label="Generator"
                                variant="outlined"
                                hide-details
                                class="mb-4"
                                @update:menu="generator_select_update"
                        ></v-select>

                        <v-select
                                :items="pcb_colors"
                                v-model="selected_pcb_color"
                                item-title="name"
                                item-value="key"
                                label="PCB colors"
                                variant="outlined"
                                hide-details
                                class="mb-2"
                        ></v-select>
                        <div v-if="!!selected_generator">
                            <h4>Generator settings</h4>
                            <v-divider class="mb-3"></v-divider>
                            <v-select
                                    :items="selected_generator.available_canvases"
                                    v-model="selected_canvas"
                                    item-title="text"
                                    item-value="key"
                                    label="Format"
                                    variant="outlined"
                                    hide-details
                                    class="mb-2"
                                    density="compact"
                                    @update:menu="generator_select_update"
                            ></v-select>
                            <p class="text-muted text-small mb-4">
                                <v-icon size="small">mdi-tape-measure</v-icon> Maximum size of this format: {{selected_canvas_size.width}}mm x {{selected_canvas_size.height}}mm
                            </p>
                            <template v-for="option in selected_generator.options" :key="option.key">
                                <v-text-field v-model="generator_options[option.key]" v-if="option.type === 'String'" density="compact" :label="option.text" class="mb-2" variant="outlined" hide-details></v-text-field>
                                <v-checkbox v-model="generator_options[option.key]" v-if="option.type === 'Boolean'" density="compact" :label="option.text" hide-details></v-checkbox>
                                <p v-if="option.help" class="text-muted text-small">
                                    <v-icon size="small">mdi-information</v-icon> {{option.help}}
                                </p>
                            </template>

                            <v-btn block :disabled="tag_generating || generators.length === 0" :loading="tag_generating" color="accent" @click="generate">Generate</v-btn>
                        </div>
                        <div v-else>
                            <h4>Choose a generator</h4>
                        </div>
                    </div>

                    <v-overlay
                            :model-value="loading_generators_and_colors"
                            contained
                            class="align-center justify-center"
                    >
                        <v-progress-circular
                                indeterminate
                                color="primary"
                        ></v-progress-circular>
                    </v-overlay>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6"  md="7" >
                <v-card v-if="tag_generated" class="mb-3">
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

                <v-card v-if="tag_generated" class="mb-3">
                    <v-card-title class="text-center bg-primary justify-center pa-0 pt-1">
                        <h3 class="font-weight-light">Export</h3>
                    </v-card-title>
                    <v-tabs v-model="export_tab" grow="" background-color="primary" dark density="compact">
                        <v-tab value="gerbers">Gerber archive</v-tab>
                        <v-tab value="kicad">Kicad</v-tab>
                    </v-tabs>
                    <v-window v-model="export_tab" >
                        <v-window-item value="gerbers">
                            <v-card class="pa-3">
                                The is the file you need if you want to get the board fabricated, here are a few links fabrication house that I used before (not affiliated) (you do not need a stencil):
                                <v-card-text>
                                    <ul>
                                        <li><a href="https://support.jlcpcb.com/article/21-how-do-i-place-an-order">JLCPCB</a> (don't forget to request no order number on the silk screen)</li>
                                        <li><a href="https://www.pcbway.com/helpcenter/Findproducts/How_do_I_place_an_order_.html">PCBWAY</a></li>
                                        <li><a href="https://oshpark.com/">OSHPARK</a></li>
                                    </ul>
                                </v-card-text>
                                <v-btn @click="download_gerber_archive" block color="accent">Download</v-btn>
                            </v-card>
                        </v-window-item>
                        <v-window-item value="kicad">
                            <v-card class="pa-3">
                                The is the file you need if you want to modify the board yourself before ordering (like adding leds & other components). Raw content of ".kicad_pcb" file:
                                <v-textarea hide-details class="mb-3" readonly label="Kicad PCB" v-model="kicad_pcb_raw"></v-textarea>
                                <v-btn @click="download_kicad_raw" block color="accent">Download</v-btn>
                            </v-card>
                        </v-window-item>
                    </v-window>
                </v-card>

                <v-card v-if="tag_generated" class="mb-3">
                    <v-expansion-panels>
                        <v-expansion-panel >
                            <v-expansion-panel-title>
                                Debug information
                            </v-expansion-panel-title>
                            <v-expansion-panel-text class="child-no-padding">
                                <v-tabs v-model="debug_tab" grow="" density="compact">
                                    <v-tab value="profiler">Profiler</v-tab>
                                    <v-tab value="files">File sizes</v-tab>
                                </v-tabs>
                                <v-window v-model="debug_tab" >
                                    <v-window-item value="profiler">
                                        <v-card class="pa-3">
                                            <table class="debug_table">
                                                <tr>
                                                    <th>Event</th>
                                                    <th>Time since handling</th>
                                                    <th>Duration</th>
                                                </tr>
                                                <tr v-for="event in profiler_results.events" :key="event.name">
                                                    <td>{{event.name}}</td>
                                                    <td>{{event.timestamp}} ms</td>
                                                    <td v-if="profiler_results.durations[event.name] !== undefined">{{profiler_results.durations[event.name]}} ms</td>
                                                    <td v-else>N/A</td>
                                                </tr>
                                            </table>
                                        </v-card>
                                    </v-window-item>
                                    <v-window-item value="files">
                                        <v-card class="pa-3">
                                            <table class="debug_table">
                                                <tr>
                                                    <th>File</th>
                                                    <th>Size</th>
                                                </tr>
                                                <tr v-for="event in file_sizes" :key="event.name">
                                                    <td>{{event.name}}</td>
                                                    <td>{{event.size}}</td>
                                                </tr>
                                            </table>
                                        </v-card>
                                    </v-window-item>
                                </v-window>

                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>

                <v-card v-else class="mb-3">
                    <v-card-title class="text-center bg-primary justify-center pa-0 py-1">
                        <h3 class="font-weight-light">Help</h3>
                    </v-card-title>
                    <div class="pa-3">
                        To generate a tag, you first need to decide what you want to generate there are a few options available:
                        <ul class="ml-8 my-2">
                            <li v-for="generator in generators" :key="generator.value.key">
                                {{generator.value.name}}: {{generator.value.short_desc}}
                            </li>
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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
	import axios from 'axios'
	import Swal from 'sweetalert2'

	function bytesToSize(bytes, decimals = 2) {
		if (bytes === 0) return '0 bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	function download_text(filename, data, mime) {
		const blob = new Blob([data], {type: mime});
		if(window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(blob, filename);
		}
		else{
			const elem = window.document.createElement('a');
			elem.href = window.URL.createObjectURL(blob);
			elem.download = filename;
			document.body.appendChild(elem);
			elem.click();
			document.body.removeChild(elem);
		}
	}
	function download_data_uri(uri, filename) {
		fetch(uri)
			.then(response => response.blob())
			.then(blob => {
				const link = document.createElement("a");
				link.href = URL.createObjectURL(blob);
				link.download = filename;
				link.click();
			})
			.catch(console.error);
	}

	export default {
		name: 'Generate',

        computed: {
			file_sizes() {
				return [
					{name: "top_layer.svg", size: bytesToSize(this.svg_top_layer_render.length)},
					{name: "bottom_layer.svg", size: bytesToSize(this.svg_bottom_layer_render.length)},
					{name: "tag.kicad_pcb", size: bytesToSize(this.kicad_pcb_raw.length)},
					{name: "tag.zip.b64", size: bytesToSize(this.gerber_archive_b64.length)},
                ]
            },
	        selected_canvas_size() {
				const s = this.selected_generator.available_canvases.filter(x=>x.key == this.selected_canvas)[0].size_max
		        s.height = Math.round(s.height)
		        s.width = Math.round(s.width)
				return s
            }
        },

		data: () => ({
			loading_generators_and_colors: true,

			pcb_colors: [],
			selected_pcb_color: null,

            generators: [],
			selected_generator: null,
			selected_canvas: null,
            generator_options: {},

			tag_generating: false,
			tag_generated: false,

			profiler_results: {events:[], durations:[]},
			debug_tab: null,
            preview_tab: null,
			export_tab: null,
			kicad_pcb_raw: "",
			svg_top_layer_render: "",
			svg_bottom_layer_render: "",
			gerber_archive_b64: "",
		}),

		beforeMount() {
			const t = this;
			axios({
				method: 'get',
				url: "/api/pcb_colors"
			}).then(function (pcb_colors_response) {
				t.pcb_colors = pcb_colors_response.data.data
				t.selected_pcb_color = "red_enig"

				axios({
					method: 'get',
					url: "/api/generators"
				}).then(function (generators_response) {
					t.generators = generators_response.data.data.map(x=>{ return {text: x.name, value: x}})
					t.selected_generator = t.generators[0].value
					t.generator_select_update()

					t.loading_generators_and_colors = false

					console.log(t.pcb_colors)
					console.log(t.generators)
				});
			});
        },

		methods: {
	        generator_select_update() {
		        if(!!this.selected_generator) {
		        	this.selected_canvas = this.selected_generator.available_canvases[0].key;
                    this.generator_options = {}
                    for (let option of this.selected_generator.options) {
                    	this.generator_options[option.key] = option.default
                    }
		        }
            },

			generate() {
				const t = this;
				if(!!this.selected_generator) {
					t.tag_generating = true
					axios({
						method: 'post',
						url: `/api/generators/${this.selected_generator.key}`,
                        data: {
	                        color: this.selected_pcb_color,
	                        canvas: this.selected_canvas,
	                        options: this.generator_options
                        }
					}).then(function (generate_response) {
						t.profiler_results = generate_response.data.data.profiler
						t.svg_top_layer_render = "data:image/svg+xml;base64,"+btoa(generate_response.data.data.gerber.render.top)
						t.svg_bottom_layer_render = "data:image/svg+xml;base64,"+btoa(generate_response.data.data.gerber.render.bottom)
						t.kicad_pcb_raw = generate_response.data.data.kicad[".kicad_pcb"]
						t.gerber_archive_b64 = generate_response.data.data.gerber.archive

						t.tag_generating = false
						t.tag_generated = true
					}).catch((err) => {
						if(err.response.data.hasOwnProperty("detail")) {
							Swal.fire({
								title: 'Uh Oh, an error occurred!',
								text: err.response.data.detail,
								icon: 'error',
								confirmButtonText: 'Close'
							})
                        } else {
							Swal.fire({
								title: 'Uh Oh, an error occurred!',
								text: "Unfortunately, there is no details for this error. Try again later",
								icon: 'error',
								confirmButtonText: 'Close'
							})
                        }
						t.tag_generating = false

                    });
                }
            },

			download_kicad_raw() {
				download_text("tag.kicad_pcb", this.kicad_pcb_raw, "text/plain")
            },

			download_gerber_archive() {
				download_data_uri("data:application/x-zip-compressed;base64,"+this.gerber_archive_b64, "tag.gerber.zip")
            }
        }
	}
</script>

<style>
    .child-no-padding > div {
        padding: 0;
    }

    .v-expansion-panel-title {
        min-height: inherit;
        max-height: 24px;
    }
    .v-expansion-panel-title--active {
        min-height: inherit !important;
        max-height: 24px !important;
    }

    .debug_table {
        font-size: 0.8em;
        border-collapse: collapse;
        width: 100%;
    }
    .debug_table th {
        text-align: center;
        background: rgb(var(--v-theme-accent)) !important;
        color: white;
    }
    .debug_table tr:nth-child(even){
        /*opacity: 0.8;*/
    }
    .debug_table tr:hover {
        font-weight: bold;
    }
    .debug_table td, .profiler_table th {
        border: 1px solid #ddd;
        padding: 0 8px;
    }

</style>