<template>
    <v-card class="mb-3">
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
                    <v-textarea hide-details class="mb-3" readonly label="Kicad PCB" v-model="data.kicad_pcb"></v-textarea>
                    <v-btn @click="download_kicad_raw" block color="accent">Download</v-btn>
                </v-card>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script>
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
		name: "generate_export_menu",

		props: {
			data: {
				type: Object,
				required: true
			},
		},

		methods: {
			download_kicad_raw() {
				download_text("tag.kicad_pcb", this.data.kicad_pcb, "text/plain")
			},

			download_gerber_archive() {
				download_data_uri("data:application/x-zip-compressed;base64,"+this.data.gerber_archive, "tag.gerber.zip")
			}
		},

		data: () => ({
			export_tab: null,
		}),
	}
</script>

<style scoped>

</style>