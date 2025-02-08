import { useTheme } from 'styled-components'

export type SpinnerProps = {
	size?: number
}

export const Spinner = ({ size = 64 }: SpinnerProps) => {
	const theme = useTheme()

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			version="1"
			viewBox="0 0 128 128"
		>
			<g>
				<circle cx="16" cy="64" r="16" fill={theme.palette.primary.dark} />
				<circle
					cx="16"
					cy="64"
					r="16"
					fill={theme.palette.primary.bold}
					fillOpacity="0.67"
					transform="rotate(45 64 64)"
				/>
				<circle
					cx="16"
					cy="64"
					r="16"
					fill={theme.palette.primary.base}
					fillOpacity="0.42"
					transform="rotate(90 64 64)"
				/>
				<circle
					cx="16"
					cy="64"
					r="16"
					fill={theme.palette.primary.light}
					fillOpacity="0.2"
					transform="rotate(135 64 64)"
				/>
				<circle
					cx="16"
					cy="64"
					r="16"
					fill={theme.palette.neutral.light}
					fillOpacity="0.12"
					transform="rotate(180 64 64)"
				/>
				<circle
					cx="16"
					cy="64"
					r="16"
					fill={theme.palette.neutral.light}
					fillOpacity="0.12"
					transform="rotate(225 64 64)"
				/>
				<circle
					cx="16"
					cy="64"
					r="16"
					fill={theme.palette.neutral.light}
					fillOpacity="0.12"
					transform="rotate(270 64 64)"
				/>
				<circle
					cx="16"
					cy="64"
					r="16"
					fill={theme.palette.neutral.light}
					fillOpacity="0.12"
					transform="rotate(315 64 64)"
				/>
				<animateTransform
					attributeName="transform"
					calcMode="discrete"
					dur="720ms"
					repeatCount="indefinite"
					type="rotate"
					values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
				/>
			</g>
		</svg>
	)
}
