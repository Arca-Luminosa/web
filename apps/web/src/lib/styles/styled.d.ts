import 'styled-components'
import type { CustomTheme } from './theme.types'

declare module 'styled-components' {
	export interface DefaultTheme extends CustomTheme {}
}
