import { MedusaService } from '@medusajs/framework/utils'
import PaymentSource from './models/payment-source'

class PaymentSourceModuleService extends MedusaService({
	PaymentSource,
}) {}

export default PaymentSourceModuleService
