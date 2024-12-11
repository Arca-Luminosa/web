import { registerOverriddenValidators } from '@medusajs/medusa'
import { StorePostCustomersReq as MedusaStorePostCustomersReq } from '@medusajs/medusa/dist/api/routes/store/customers/create-customer'
import { IsArray } from 'class-validator'
import { WompiPaymentMethod } from 'src/models/wompiPaymentMethod'

class StorePostCustomersReq extends MedusaStorePostCustomersReq {
	@IsArray({})
  payment_methods: WompiPaymentMethod[]
}

registerOverriddenValidators(StorePostCustomersReq)
