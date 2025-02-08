import Link from 'next/link'
import styled from 'styled-components'

export const StyledLink = styled(Link)`
	color: inherit;
	display: inline-block;
	font-family: ${({ theme }) => theme.typography.primaryFont};
	font-size: 24px;
	font-weight: bold;
	line-height: 30px;
	position: relative;
	text-decoration: none;
	z-index: 0;

	&::before {
		background-color: ${({ theme }) => theme.palette.primary.light}80;
		bottom: 0;
		content: '';
		left: 0;
		position: absolute;
		right: 4%;
		top: 35%;
		transition: ${({ theme }) => `right ${theme.vars.transitionTime}, ${theme.vars.transitionTime}, left ${theme.vars.transitionTime} ${theme.vars.transitionTime}`};
		will-change: left, right;
		z-index: -1;
	}

	&:hover {
		color: inherit;

		&::before {
			left: 30%;
			right: -30%;
		}
	}
`
