'use client'
import { PropsWithChildren, useEffect } from 'react'
import Script from 'next/script'
import { DefaultTheme, useTheme } from 'styled-components'
import { Footer, /* Header, */ Main } from '@/lib/ui'
import type { FooterProps/*, HeaderProps*/ } from '@/lib/ui'
import pkg from '../../../package.json'

const logAppVersion = (theme: DefaultTheme ) => console.log(
	`%c${pkg.description}, version: ${pkg.version}`,
	`background: ${theme.palette.neutral.dark};
		color: ${theme.palette.neutral.light};
		font-size: x-large;
		padding: 0.5em;`,
)

type DocumentProps = {
	// header: HeaderProps
	footer: FooterProps
}

export const Document = ({
	children,
	// header,
	footer
}: PropsWithChildren<DocumentProps>) => {
	const theme = useTheme()
	useEffect(() => {
		logAppVersion(theme)
	}, []);

	return (
		<html lang="es-CO" suppressHydrationWarning>
			<head>
				<link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<meta name="apple-mobile-web-app-title" content="IAHL" />
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body>
				{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY  &&<Script
					strategy='beforeInteractive'
					src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
				/>}
				{/* <Header {...header} /> */}
				<Main>
					{children}
				</Main>
				<Footer {...footer} />
			</body>
		</html>
	)
}
