import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { WOMPI_MODULE_SERVICE } from 'src/modules/wompi'
import PaymentSourceService from 'src/modules/wompi/service'
import type { PaymentSourceData, PaymentSourceRecord } from 'src/modules/wompi/types'

export const createPaymentSourceStep = createStep(
	'create-payment-source',
	async (paymentSourceInput: PaymentSourceData, { container }) => {
		const wompiModuleService: PaymentSourceService = container.resolve(WOMPI_MODULE_SERVICE)
		const paymentSource: PaymentSourceRecord = await wompiModuleService.createPaymentSources({ data: paymentSourceInput })
		return new StepResponse(paymentSource, paymentSource)
	},
	async (paymentSource, { container }) => {
		const wompiModuleService: PaymentSourceService = container.resolve(WOMPI_MODULE_SERVICE)
		if (paymentSource) {
			wompiModuleService.deletePaymentSources(paymentSource.id)
		}
	}
)
