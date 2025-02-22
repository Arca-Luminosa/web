import Script from 'next/script'
import { cookies } from 'next/headers'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Document, Providers, StyledComponentsRegistry } from '@/lib/components'
import type { FooterProps, HeaderProps } from '@/lib/ui'

const { GA_MEASUREMENT_ID } = process.env

const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const cookieStore = await cookies()
	const hasSession = cookieStore.has('session');
	const headerProps: HeaderProps = {
		hasSession
	}

	const footerProps: FooterProps = {
		id: 'footer',
		title: 'Este es el footer',
		copyright: 'Copyright',
	}

	return (
		<html lang="es-CO" suppressHydrationWarning>
			<head>
				{/* <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<meta name="apple-mobile-web-app-title" content="ArcaPlus" />
				<link rel="manifest" href="/site.webmanifest" /> */}
				{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && <Script
					strategy='beforeInteractive'
					src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
				/>}
			</head>
			<body>
				<StyledComponentsRegistry>
					<Providers>
						<Document footer={footerProps} header={headerProps}>
							{children}
							{GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
						</Document>
					</Providers>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}

export const revalidate = 60

export default RootLayout
