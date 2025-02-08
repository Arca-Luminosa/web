'use client'
import { PropsWithChildren } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, defaultTheme } from '@/lib/styles'

export const Providers = ({
	children
}: PropsWithChildren) => (
	<ThemeProvider theme={defaultTheme}>
		<GlobalStyle />
			{children}
	</ThemeProvider>
)
