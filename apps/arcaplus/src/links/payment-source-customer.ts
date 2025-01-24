import { defineLink } from '@medusajs/framework/utils'
import WompiModule from '../modules/wompi'
import CustomerModule from '@medusajs/medusa/customer'

export default defineLink(
	{
		linkable: WompiModule.linkable.paymentSource,
		isList: true
	},
	CustomerModule.linkable.customer,
)
