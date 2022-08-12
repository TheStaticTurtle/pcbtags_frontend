<template>
    <v-container fluid class="pa-md-8">
        <v-row>
            <v-col cols="12" sm="6" md="5" >
                <generate_config
                        :tag_generated="tag_generated"
                        :tag_generating="tag_generating"
                        v-model="generator_config"
                        @generate="generate"
                />
            </v-col>
            <v-col cols="12" sm="6"  md="7" >
                <generate_preview_menu v-if="tag_generated" :data="preview_data"/>
                <generate_export_menu v-if="tag_generated" :data="export_data"/>
                <generate_debug v-if="tag_generated" :data="debug_data"/>

                <generate_help_card v-else/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
	import axios from 'axios'
	import Swal from 'sweetalert2'
	import Generate_help_card from "../components/generate/generate_help_card.vue";
	import Generate_debug from "../components/generate/generate_debug.vue";
	import Generate_export_menu from "../components/generate/generate_export_menu.vue";
	import Generate_preview_menu from "../components/generate/generate_preview_menu.vue";
	import Generate_config from "../components/generate/generate_config.vue";

	function bytesToSize(bytes, decimals = 2) {
		if (bytes === 0) return '0 bytes';

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}


	export default {
		name: 'Generate',
		components: {
			Generate_config,
			Generate_preview_menu,
            Generate_export_menu,
            Generate_debug,
            Generate_help_card
        },

		data: () => ({
			tag_generating: false,
			tag_generated: false,

            generator_config: {
	            pcb_color: null,
	            generator: null,
	            canvas: null,
				options: {}
            },

            preview_data: {
				gerber: {
					top: "",
                    bottom: "",
                }
            },
            debug_data: {
				profiler: {
					events: [],
                    durations: []
                },
	            file_sizes: []
            },
            export_data: {
	            kicad_pcb: "",
	            gerber_archive_b64: "",
            }
		}),

		methods: {
			generate() {
				const t = this;
				if(!!this.generator_config.generator) {
					t.tag_generating = true
					axios({
						method: 'post',
						url: `/api/generators/${this.generator_config.generator.key}`,
                        data: {
	                        color: this.generator_config.pcb_color,
	                        canvas: this.generator_config.canvas,
	                        options: this.generator_config.options
                        }
					}).then(function (generate_response) {
						t.preview_data = {
							gerber: generate_response.data.data.gerber.render
                        }
						t.debug_data = {
							profiler: generate_response.data.data.profiler,
                            file_sizes: [
	                            {name: "top_layer.svg", size: bytesToSize(generate_response.data.data.gerber.render.top.length)},
	                            {name: "bottom_layer.svg", size: bytesToSize(generate_response.data.data.gerber.render.bottom.length)},
	                            {name: "tag.kicad_pcb", size: bytesToSize(generate_response.data.data.kicad[".kicad_pcb"].length)},
	                            {name: "tag.zip.b64", size: bytesToSize(generate_response.data.data.gerber.archive.length)},
                            ]
						}
						t.export_data = {
							kicad_pcb: generate_response.data.data.kicad[".kicad_pcb"],
							gerber_archive: generate_response.data.data.gerber.archive,
						}

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
            }
        }
	}
</script>

<style>


</style>