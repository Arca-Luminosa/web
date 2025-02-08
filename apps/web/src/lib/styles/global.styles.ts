import { css, createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

export const GlobalStyle = createGlobalStyle`
	${normalize()}

	*,
	*::after,
	*::before {
		box-sizing: border-box;
	}

	a {
		color: ${({ theme }) => theme.palette.primary.light};
		transition: color ${({ theme }) => theme.vars.transitionTime};

		&:hover {
			color: ${({ theme }) => theme.palette.primary.bold};
		}
	}

	body {
		background-color: ${({ theme }) => theme.palette.neutral.light};
		color: ${({ theme }) => theme.palette.primary.bold};
		display: grid;
		font-family: ${({ theme }) => theme.typography.primaryFont};
		grid-template-areas:
			'header'
			'main'
			'footer';
		margin: 0 auto;
		-webkit-font-smoothing: antialiased;
	}

	figure {
		text-align: center;
	}

	footer {
		grid-area: footer;
	}

	header {
		grid-area: header;
	}

	html {
		scroll-behavior: smooth !important;
	}

	iframe {
		border: none;
	}

	img {
		max-width: 100%;
		vertical-align: middle;
	}

	main {
		grid-area: main;
	}

	ul {
		padding-left: 1.5em;
	}
`;

export const sectionWrapper = css`
	margin: 0 auto;
	padding: 1rem 2rem;
	width: 100%;
`

export const sectionTitle = css`
	color: ${({ theme }) => theme.palette.secondary.bold};
	font-size: 48px;
	line-height: 56px;
	margin: 0 auto;
	text-align: center;
`
