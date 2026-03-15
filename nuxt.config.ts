// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    compatibilityDate: '2025-11-01',
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/icon', '@nuxt/fonts'],
    ssr: false,

    app: {
        head: {
            title: 'FunkSim',
            meta: [
                {name: 'description', content: 'Simulation eines BOS-Funkgeräts'},
                {property: 'og:title', content: 'FunkSim - BOS-Funkgerätesimulation'},
                {property: 'og:description', content: 'Simulation eines BOS-Funkgeräts'},
                {
                    property: 'og:image',
                    content: 'https://funk.nur-kurz.de/images/og_image.png'
                },
                {
                    property: 'og:url',
                    content: 'https://funk.nur-kurz.de'
                },
                {property: 'og:type', content: 'website'}
            ]
        }
    }

})