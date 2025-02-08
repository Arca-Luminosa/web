import { darken, lighten } from 'polished'
import { BasicColour, Colour } from './theme.types'


const arcaDark = 'black'
const arcaLigth = 'white'
const arcaBlue = 'blue'
const arcaOrange = 'orange'

export const neutral: BasicColour = {
	dark: arcaDark,
	light: arcaLigth,
}

export const blue: Colour = {
	dark: darken(0.1, arcaBlue),
	bold: darken(0.05, arcaBlue),
	base: arcaBlue,
	light: lighten(0.05, arcaBlue),
}

export const orange: Colour = {
	dark: darken(0.14, arcaOrange),
	bold: darken(0.09, arcaOrange),
	base: arcaOrange,
	light: lighten(0.1, arcaOrange),
}
