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

                <v-container>
                    <v-row>
                        <v-col>
                            <v-card>
                                <a href="https://github.com/TheStaticTurtle/pcbtags_frontend" target="_blank">
                                    <v-img :src="frontend_opengraph"></v-img>
                                </a>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card>
                                <a href="https://github.com/TheStaticTurtle/pcbtags_server" target="_blank">
                                    <v-img :src="backend_opengraph"></v-img>
                                </a>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>


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

	const cyrb53 = function(str, seed = 0) {
		let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
		for (let i = 0, ch; i < str.length; i++) {
			ch = str.charCodeAt(i);
			h1 = Math.imul(h1 ^ ch, 2654435761);
			h2 = Math.imul(h2 ^ ch, 1597334677);
		}
		h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
		h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
		return 4294967296 * (2097151 & h2) + (h1>>>0);
	};

    function makeid(length) {
        const d = new Date();
	    const txt = d.getDate()  + "_" + (d.getMonth()+1) + "_" + d.getFullYear() + "_" + d.getHours()
        return cyrb53(txt);
    }
	export default {
		name: 'About',

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
			frontend_opengraph: "https://opengraph.githubassets.com/"+makeid(50)+"/TheStaticTurtle/pcbtags_frontend",
			backend_opengraph: "https://opengraph.githubassets.com/"+makeid(50)+"/TheStaticTurtle/pcbtags_server"
		}),
	}
</script>
