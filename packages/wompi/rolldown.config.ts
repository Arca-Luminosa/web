import { defineConfig, RolldownPluginOption } from 'rolldown'
import { minify } from 'rollup-plugin-esbuild'

export default defineConfig({
	input: 'src/index.ts',
	output: {
		file: 'dist/index.js',
	},
	plugins: [minify()] as RolldownPluginOption
})
