import { model } from '@medusajs/framework/utils'

const PaymentSource = model.define('payment_source', {
	id: model.id().primaryKey(),
	data: model.json(),
})

export default PaymentSource
