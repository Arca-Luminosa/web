import styled from 'styled-components'
import { dynamicComponent } from '@/lib/ui'
import { sectionWrapper } from '@/lib/styles'

export const StyledSection = styled(dynamicComponent('section', true))`
	${sectionWrapper}
	padding: 2rem;

	${({ theme }) => theme.mediaQueries.tabletPortraitUp} {
		padding: 2rem 2rem 14rem;
	}
`
