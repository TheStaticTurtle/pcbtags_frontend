<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" sm="4" md="4" >
                <v-card>
                    <a href="https://github.com/TheStaticTurtle/pcbtags_frontend" target="_blank">
                        <v-img :src="frontend_opengraph"></v-img>
                    </a>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4" md="4">
                <v-card>
                    <a href="https://github.com/TheStaticTurtle/pcbtags_server" target="_blank">
                        <v-img :src="backend_opengraph"></v-img>
                    </a>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4" md="4">
                <v-card>
                    <a href="https://github.com/TheStaticTurtle/pcbtags_docker" target="_blank">
                        <v-img :src="docker_opengraph"></v-img>
                    </a>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
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
		name: "opengraph_git_images",

		data: () => ({
			frontend_opengraph: "https://opengraph.githubassets.com/"+makeid(50)+"/TheStaticTurtle/pcbtags_frontend",
			backend_opengraph: "https://opengraph.githubassets.com/"+makeid(50)+"/TheStaticTurtle/pcbtags_server",
			docker_opengraph: "https://opengraph.githubassets.com/"+makeid(50)+"/TheStaticTurtle/pcbtags_docker",
		}),
	}
</script>

<style scoped>

</style>