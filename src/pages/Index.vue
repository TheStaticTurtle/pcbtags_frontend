<template>
    <v-container>
        <v-row class="text-center">

            <v-col class="mb-4">
                <h1 class="display-2 font-weight-bold mb-3">
                    Theme
                </h1>

                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="background">background</v-card>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="surface">surface</v-card>
                <br>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="primary-darken-1">primary-darken-1</v-card>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="primary">primary</v-card>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="primary-lighten-1">primary-lighten-1</v-card>
                <br>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="secondary-darken-1">secondary-darken-1</v-card>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="secondary">secondary</v-card>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="secondary-lighten-1">secondary-lighten-1</v-card>
                <br>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="error">error</v-card>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="info">info</v-card>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="success">success</v-card>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="warning">warning</v-card>
                <br>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="accent">accent</v-card>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="anchor">anchor</v-card>
                <v-card style="height: 50px; width: 150px; display: inline-block" class="ma-2" color="muted">muted</v-card>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>

	import { useMeta } from 'vue-meta'

	export default {
		setup () {
			useMeta({
				title: 'Home',
			})
		},
		name: 'Index',

		data: () => ({
		}),
	}
</script>
