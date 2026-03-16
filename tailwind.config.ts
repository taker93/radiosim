import type {Config} from 'tailwindcss'

export default <Partial<Config>>{
    content: [
        './app/deviceProfiles/**/*.ts',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: 'Figtree',
                serif: 'Inria Serif',
                mono: 'JetBrains Mono'
            },
        }
    }
}