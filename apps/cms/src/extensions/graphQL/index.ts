import type { Core } from '@strapi/strapi'
import { extendUser } from './extendUser'

const extensions = [extendUser]

export const graphQLExtensions = (extensionService: Core.Service) => {
	for (const extension of extensions) {
		extensionService.use(extension)
	}
}
