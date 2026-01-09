import { Pixelify_Sans } from "next/font/google"
import { Roboto } from "next/font/google"

export const pixelify = Pixelify_Sans({
    weight: ['400','500','600'],
})

export const roboto = Roboto({
    weight: ['300','400'],
    style: ['normal', 'italic'],
})