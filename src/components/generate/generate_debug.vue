<template>
    <v-card class="mb-3">
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
                                    <thead>
                                        <tr>
                                            <th class="small">Facility</th>
                                            <th>Event</th>
                                            <th class="small">Time</th>
                                            <th class="small">Δt since last</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="event in data.profiler.events" :key="event.name">
                                            <td class="small">{{ event.facility }}</td>
                                            <td>{{ event.name }}</td>
                                            <td v-if="!event.cached">{{ event.relative_timestamp }} ms</td>
                                            <td v-if="!event.cached">{{ event.time_since_last_event }} ms</td>
                                            <td class="center" v-else colspan="2">cached</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th style="text-align: left" colspan="2">Total</th>
                                            <th class="center" colspan="2">{{ data.profiler.duration }} ms</th>
                                        </tr>
                                    </tfoot>
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
                                    <tr v-for="file in data.file_sizes" :key="file.name">
                                        <td>{{file.name}}</td>
                                        <td>{{file.size}}</td>
                                    </tr>
                                </table>
                            </v-card>
                        </v-window-item>
                    </v-window>

                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
</template>

<script>
	export default {
		name: "generate_debug",

		props: {
			data: {
				type: Object,
				required: true
			},
		},

		data: () => ({
			debug_tab: null,
		}),
	}
</script>

<style scoped>

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
    .debug_table td, .debug_table th {
        border: 1px solid #ddd;
        padding: 0 4px;
        white-space: nowrap;
    }
    .debug_table .center {
        text-align: center;
    }
    .debug_table .small {
        /*width: 15%;*/
    }
</style>