import type { HTMLAttributeAnchorTarget, ReactNode } from 'react'
import { StyledLink } from './Link.styles'
import { isExternalURL } from '@/lib/utils'

export type LinkProps = {
	href: string
	target?: HTMLAttributeAnchorTarget
	children: ReactNode
}

export const Link = ({ href, target, children, ...props }: LinkProps) => {
	const isExternal = isExternalURL(href)

	return <StyledLink
		href={href}
		target={isExternal ? target || '_blank' : target}
		rel={isExternal ? 'noopener noreferer' : undefined}
		{...props}
	>{children}</StyledLink>
}
