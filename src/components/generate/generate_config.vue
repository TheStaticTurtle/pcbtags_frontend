<template>
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
                    <v-text-field v-model="generator_options[option.key]" v-if="option.type === 'String'" density="compact" :label="option.text" class="mb-4" variant="outlined" hide-details></v-text-field>
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

        <v-overlay :model-value="loading_generators_and_colors" contained class="align-center justify-center"  >
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-overlay>
    </v-card>
</template>

<script>
	import axios from 'axios'

	export default {
		name: "generate_config",

		computed: {
			selected_canvas_size() {
				const s = this.selected_generator.available_canvases.filter(x => x.key == this.selected_canvas)[0].size_max
				s.height = Math.round(s.height) || s.height
				s.width = Math.round(s.width) || s.width
				return s
			}
		},

		props: {
			modelValue: {
				type: Object,
            },
			tag_generating: {
				type: Boolean,
				required: true,
			},
			tag_generated: {
				type: Boolean,
				required: true,
			},
		},

		emits: [
			'update:modelValue',
            'generate'
        ],

        watch: {
	        modelValue(newVal) {
				this.selected_pcb_color = newVal.pcb_color
                this.selected_generator = newVal.generator
                this.selected_canvas = newVal.canvas
				this.generator_options = newVal.options
            }
        },

		data: () => ({
			loading_generators_and_colors: true,

			pcb_colors: [],
			selected_pcb_color: null,

			generators: [],
			selected_generator: null,
			selected_canvas: null,

			generator_options: null,
		}),

		beforeMount() {
			const t = this;
			axios({
				method: 'get',
				url: "/api/pcb_colors"
			}).then(function (pcb_colors_response) {
				t.pcb_colors = pcb_colors_response.data.data
				t.selected_pcb_color = "blue_enig"

				axios({
					method: 'get',
					url: "/api/generators"
				}).then(function (generators_response) {
					t.generators = generators_response.data.data.map(x => {
						return {text: x.name, value: x}
					})
					t.selected_generator = t.generators[0].value
					t.generator_select_update()

					t.loading_generators_and_colors = false
				});
			});
		},


		methods: {
			generator_select_update() {
				if (!!this.selected_generator) {
					this.selected_canvas = this.selected_generator.available_canvases[0].key;
					this.generator_options = {}
					for (let option of this.selected_generator.options) {
						this.generator_options[option.key] = option.default
					}
					this.emit_update()
				}
			},

            generate() {
	            this.emit_update()
	            this.$emit("generate")
            },

            emit_update() {
				this.$emit("update:modelValue", {
					pcb_color: this.selected_pcb_color,
					generator: this.selected_generator,
					canvas: this.selected_canvas,
					options: this.generator_options,
                })
            }
		},


	}
</script>

<style scoped>

</style>