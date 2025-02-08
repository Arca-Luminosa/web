import type { PropsWithChildren, ReactElement } from 'react'
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '@/lib/styles'

const AllTheProviders = ({ children }: PropsWithChildren) => (
	<ThemeProvider theme={defaultTheme}>
		{children}
	</ThemeProvider>
)

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
