// plugins/directives.ts
import {defineNuxtPlugin} from '#app'
import {vLongpress} from '~/directives/v-use-longpress'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('use-longpress', vLongpress)
})