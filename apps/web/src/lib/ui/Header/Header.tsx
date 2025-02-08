import { forwardRef } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { WrappedHeader, Logo, Nav, Ul, Li, A } from './Header.styles'
import { Button } from '@/lib/ui'

type MenuItem = {
	label: string
	link: string
	type: 'link' | 'primary' | 'secondary'
	newTab?: boolean
}

export type Menu = {
	name: string
	items: MenuItem[]
}

export type HeaderProps = {
	logo: string
	logoAltText: string
	logoWidth: number
	logoHeight: number
	fixed?: boolean
	menu: Menu
}

export const Header = forwardRef<Element, HeaderProps>(({ logo, logoAltText, logoWidth, logoHeight, fixed, menu }, ref) => (
	<WrappedHeader ref={ref} $isFixed={fixed}>
		<Logo>
			<Link href="/">
				<Image src={logo} alt={logoAltText} width={logoWidth} height={logoHeight} priority />
			</Link>
		</Logo>
		<Nav>
			<Ul>
				{menu.items.map(({ label, link, type, newTab = false }) => {
					const ClickableElement = type === 'link' ? A : Button
					const isSecondary = type === 'secondary' ? true : undefined
					return (
						<Li key={label}>
							<ClickableElement href={link} target={newTab ? '_blank' : '_self'} secondary={isSecondary}>{label}</ClickableElement>
						</Li>
					)
				})}
			</Ul>
		</Nav>
	</WrappedHeader>
))

Header.displayName = 'Header'
