import type { HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode } from 'react'
import { isExternalURL } from '@/lib/utils'
import { StyledButton, StyledLink } from './Button.styles'

export type ButtonProps = {
	href?: string
	secondary?: boolean
	small?: boolean
	uppercase?: boolean
	children: ReactNode
	onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
	type?: 'button' | 'submit' | 'reset'
	target?: HTMLAttributeAnchorTarget
	disabled?: boolean
}

export const Button = ({ href, secondary, small, uppercase, children, type = 'button', target, disabled, ...props }: ButtonProps) => {
	let button: JSX.Element

	if (href) {
		const isExternal = isExternalURL(href)
		button = (
			<StyledLink
				href={href}
				$secondary={secondary}
				$small={small}
				$uppercase={uppercase}
				target={isExternal ? target || '_blank' : target}
				rel={isExternal ? 'noopener noreferer' : undefined}
				{...props}
			>{children}</StyledLink>
		)
	} else {
		button = (
			<StyledButton
				type={type}
				$secondary={secondary}
				$small={small}
				$uppercase={uppercase}
				disabled={disabled}
				{...props}
			>{children}</StyledButton>
		)
	}
	return button
}
