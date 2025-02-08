import type { MediaQueries, Palette, Typography, Vars, ZIndex } from './theme.types'
import { blue, neutral, orange } from './corlours'
import { CustomTheme } from './theme.types';

export const typography: Typography = {
	primaryFont: 'Arial',
	typeScale: {
		h1: '1.8rem',
		h2: '1.6rem',
		h3: '1.4rem',
		h4: '1.2rem',
		h5: '1.1rem',
		h6: '1rem',
		paragraph: '1rem',
		helper: '0.8rem',
		copyright: '0.7rem',
	},
}

export const palette: Palette = {
	neutral: neutral,
	primary: blue,
	secondary: orange,
}

export const vars: Vars = {
	transitionTime: '0.3s',
	phoneUpperBoundary: 600,
	tabletPortraitUpperBoundary: 900,
	tabletLandscapeUpperBoundary: 1200,
	desktopUpperBoundary: 1400,
}

export const zIndex: ZIndex = {
	modal: 900,
	overlay: 800,
	dropdown: 700,
	header: 600,
	footer: 500,
	layer: 400,
}

// Based on https://www.freecodecamp.org/news/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862/
export const mediaQueries: MediaQueries = {
	phoneOnly: `@media (max-width: ${vars.phoneUpperBoundary - 1}px)`,
	tabletPortraitUp: `@media (min-width: ${vars.phoneUpperBoundary}px)`,
	tabletLandscapeUp: `@media (min-width: ${vars.tabletPortraitUpperBoundary}px)`,
	desktopUp: `@media (min-width: ${vars.tabletLandscapeUpperBoundary}px)`,
	largeDesktop: `@media (min-width: ${vars.desktopUpperBoundary}px)`,
}

export const defaultTheme: CustomTheme = {
	palette,
	mediaQueries,
	typography,
	vars,
	zIndex,
} as const
