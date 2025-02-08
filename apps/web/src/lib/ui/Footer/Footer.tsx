import { Copyright, StyledFooter, Title } from './Footer.styles'

export type FooterProps = {
	id: string
	title: string
	copyright: string
}

export const Footer = ({ id, title, copyright }: FooterProps) => {
	return (
		<StyledFooter id={id}>
			<Title>{title}</Title>
			<Copyright>{`${copyright} © ${new Date().getFullYear()}`}</Copyright>
		</StyledFooter>
	)
}
