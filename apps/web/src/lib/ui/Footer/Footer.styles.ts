import styled from 'styled-components'
import { dynamicComponent, Wrapper } from '@/lib/ui'
import { sectionWrapper, sectionTitle } from '@/lib/styles'

export const StyledFooter = styled(dynamicComponent('footer', true))`
	${sectionWrapper}
	background-color: ${({ theme }) => theme.palette.primary.light}33;
	padding: 2rem 2rem 4rem;

	${Wrapper} {
		display: grid;
		gap: 2em;
		grid-template-areas:
			'title'
			'copyright';
		${({ theme }) => theme.mediaQueries.tabletPortraitUp} {
			grid-template-areas:
				'title title'
				'copyright copyright';
			grid-template-columns: 1fr 1fr;
		}
	}
`

export const Title = styled.h2`
	${sectionTitle}
	color: ${({ theme }) => theme.palette.primary.bold};
	grid-area: title;
	margin-bottom: 1em;

	${({ theme }) => theme.mediaQueries.tabletPortraitUp} {
		text-align: left;
	}
`

export const Copyright = styled.div`
	border-top: 2px solid ${({ theme }) => theme.palette.primary.light }80;
	grid-area: copyright;
	padding-top: 1em;
`
