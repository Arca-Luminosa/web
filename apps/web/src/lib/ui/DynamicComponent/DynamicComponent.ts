import type { PropsWithChildren } from 'react'
import { createElement, forwardRef } from 'react'
import { Wrapper } from './DynamicComponent.styles'

export type DynamicComponentProps = PropsWithChildren<{
	[key: string]: unknown
}>

export const dynamicComponent = (tag: string, hasWrapper = false) => {
	const component = forwardRef<Element, DynamicComponentProps>(({ children, ...props }: DynamicComponentProps, ref) => {
		const content = hasWrapper ? createElement(Wrapper, {}, children) : children
		return createElement(tag, { ...props, ref }, content)
	})
	component.displayName = `Dynamic-${tag}`
	return component
}

export const Main = dynamicComponent('main');
