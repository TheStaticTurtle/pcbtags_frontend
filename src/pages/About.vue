<template>
    <v-container>
        <v-row class="text-center">
            <v-col class="mb-4 mx-16">
                <h1 class="display-2 font-weight-bold mb-3">
                    PCBTAGS
                </h1>

                <p class="subheading font-weight-regular">
                    A simple tool to create customized keychain name tags, spotify code tags, business card, and more with PCBs.<br>
                    This tool will export a gerber file which should be ready for production by all major factories.
                </p>
            </v-col>
        </v-row>

        <v-row class="text-center">
            <v-col class="mb-5">
                <h2 class="headline font-weight-bold mb-5">
                    About me
                </h2>

                <p class="subheading font-weight-regular">
                    You can find out more about me on my <a href="https://thestaticturtle.fr" target="_blank">website</a> or <a href="https://blog.thestaticturtle.fr" target="_blank">blog</a>
                </p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
	export default {
		name: 'About',

		data: () => ({
		}),
	}
</script>
