import type { HeaderProps } from './Header'

export const mockData: HeaderProps = {
	logo: '/logo.svg',
	logoAltText: 'This is the logo',
	logoWidth: 80,
	logoHeight: 80,
	menu: {
		name: 'Main menu',
		items: [
			{
				label: 'Item 1',
				link: '/link-1',
				type: 'link',
			},
			{
				label: 'Item 2',
				link: '/link-2',
				type: 'link',
			},
		],
	},
}
