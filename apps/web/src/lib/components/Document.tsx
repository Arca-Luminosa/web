'use client'
import { PropsWithChildren, useEffect } from 'react'
import { DefaultTheme, useTheme } from 'styled-components'
import { Footer, Header, Main } from '@/lib/ui'
import type { FooterProps, HeaderProps } from '@/lib/ui'
import pkg from '../../../package.json'

const logAppVersion = (theme: DefaultTheme ) => console.log(
	`%c${pkg.description}, version: ${pkg.version}`,
	`background: ${theme.palette.neutral.dark};
		color: ${theme.palette.neutral.light};
		font-size: x-large;
		padding: 0.5em;`,
)

type DocumentProps = {
	header: HeaderProps
	footer: FooterProps
}

export const Document = ({
	children,
	header,
	footer
}: PropsWithChildren<DocumentProps>) => {
	const theme = useTheme()
	useEffect(() => {
		logAppVersion(theme)
	}, []);

	return (<>
		<Header {...header} />
		<Main>
			{children}
		</Main>
		<Footer {...footer} />
	</>
	)
}
