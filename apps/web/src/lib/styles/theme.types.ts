export type BasicColour = {
	dark: string
	light: string
}

export type Colour = BasicColour & {
	bold: string
	base: string
}

export type Colours = Record<string, BasicColour | Colour>

export type Palette = {
	neutral: BasicColour
	primary: Colour
	secondary: Colour
}

export type Typography = {
	primaryFont: string
	secondaryFont?: string
	typeScale: {
		h1: string
		h2: string
		h3: string
		h4: string
		h5: string
		h6: string
		paragraph: string
		helper: string
		copyright: string
	}
}

export type Vars = {
	transitionTime: string
	phoneUpperBoundary: number
	tabletPortraitUpperBoundary: number
	tabletLandscapeUpperBoundary: number
	desktopUpperBoundary: number
}

export type ZIndex = {
	modal: number
	overlay: number
	dropdown: number
	header: number
	footer: number
	layer: number
}

export type MediaQueries = {
	phoneOnly: string
	tabletPortraitUp: string
	tabletLandscapeUp: string
	desktopUp: string
	largeDesktop: string
}

export type CustomTheme = {
	palette: {
		neutral: BasicColour
		primary: Colour
		secondary: Colour
	}
	mediaQueries: MediaQueries
	typography: Typography
	vars: Vars
	zIndex: ZIndex
}
