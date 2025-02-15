import type { PropsWithChildren } from 'react'
import { StyledSection } from './Section.styles'

export type SectionProps = {
	sectionID?: string
}

export const Section = ({ children, sectionID }: PropsWithChildren<SectionProps>) => (
	<StyledSection id={sectionID}>
		{children}
	</StyledSection>
)
