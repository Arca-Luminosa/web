import styled from 'styled-components'
import Link from 'next/link'
import { transitions } from 'polished'
import { dynamicComponent, Wrapper } from '@/lib/ui'
import { sectionWrapper } from '@/lib/styles'

export const WrappedHeader = styled(dynamicComponent('header', true))`
	${sectionWrapper}
	background-color: ${({ theme }) => theme.palette.primary.dark};
	position: ${({ $isFixed }) => ($isFixed ? 'sticky' : 'static')};
	top: 0;
	z-index: ${({ theme }) => theme.zIndex.header};

	${Wrapper} {
		display: grid;
		gap: 1em;
		grid-template-areas: 'logo menu';
		justify-content: space-between;
		place-items: center;
	}
`

export const Logo = styled.div`
	grid-area: logo;
`

export const Nav = styled.nav`
	grid-area: menu;
`

export const Ul = styled.ul`
	align-items: center;
	display: grid;
	gap: 1em;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	margin: 0;
	padding: 0;
`

export const Li = styled.li`
	display: grid;

	&:not(:last-of-type) {
		display: none;

		${({ theme }) => theme.mediaQueries.tabletPortraitUp} {
			display: block;
			text-align: center;
		}
	}
`

export const A = styled(Link)`
	color: ${({ theme }) => theme.palette.neutral.light};
	font-weight: bold;
	text-align: center;
	text-decoration: none;
	${({ theme }) => transitions(['color'], theme.vars.transitionTime)};

	&:hover {
		color: ${({ theme }) => theme.palette.primary.light};
	}
`
