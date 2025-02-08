import { GoogleAnalytics } from '@next/third-parties/google'
import { Document, Providers, StyledComponentsRegistry } from '@/lib/components';
import type { FooterProps } from '@/lib/ui';

const { GA_MEASUREMENT_ID } = process.env

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	const footerProps: FooterProps = {
		id: 'footer',
		title: 'Este es el footer',
		copyright: 'Copyright',
	}

	return (
		<StyledComponentsRegistry>
			<Providers>
				<Document footer={footerProps}>
					{children}
					{GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
				</Document>
			</Providers>
		</StyledComponentsRegistry>
	);
}

export const revalidate = 60
