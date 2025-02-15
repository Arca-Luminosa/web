import Link from 'next/link'
import styled from 'styled-components'

export const StyledLink = styled(Link)`
	color: inherit;
	display: inline-block;
	font-family: ${({ theme }) => theme.typography.primaryFont};
	font-weight: bold;
`
