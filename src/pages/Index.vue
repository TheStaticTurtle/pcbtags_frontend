<template>
    <v-container fluid class="pa-0 ma-0">
        <v-row class="text-center pa-0 ma-0">
            <v-carousel v-model="carousel" height="auto" hide-delimiters progress="accent" >
                <v-carousel-item v-for="(image, i) in images" :key="i">
                    <v-sheet width="100%" :aspect-ratio="21/10">
                        <div class="carousel-image-container">
                            <img :src="image.img" alt=""/>
                            <div>
                                <h1 v-html="image.title"></h1>
                                <p v-html="image.subtitle"></p>
                                <v-btn variant="outlined" class="mt-8" size="x-large" to="/generate">
                                    START <v-icon class="ml-5">mdi-arrow-right</v-icon>
                                </v-btn>
                            </div>
                        </div>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </v-row>
    </v-container>
</template>

<script>
	import { useMeta } from 'vue-meta'
	import pcbtags_irl_1 from "../assets/pcbtags-irl-1.jpeg"
	import pcbtags_irl_2 from "../assets/pcbtags-irl-2.jpeg"
	import pcbtags_irl_3 from "../assets/pcbtags-irl-3.jpeg"
	import pcbtags_irl_4 from "../assets/pcbtags-irl-4.jpeg"

	export default {
		setup () {
			useMeta({
				title: 'Home',
			})
		},
		name: 'Index',

		data: () => ({
            carousel: null,
            images: [
                { img: pcbtags_irl_3, title: "Spotify tags", subtitle: "Generate small tags capable of carrying your preferred artist, song, playlist<br>Pranks your friends with auto-playing Rick-Rolls" },
	            { img: pcbtags_irl_1, title: "Nametags", subtitle: "Have a stash of nametags with your contact infos and share it easily with the QR-Code<br>Never loose anything again"},
            ]
		}),
	}
</script>

<style scoped>
    .carousel-image-container {
        width: 100%;
        /*max-height: 400px;*/
        /*height: 100vh;*/
        height: calc(100vh - 64px - 27px);
        position: relative;
    }
    .carousel-image-container div {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 65%;
        height: 100%;
        color: #FFF;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .carousel-image-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>
