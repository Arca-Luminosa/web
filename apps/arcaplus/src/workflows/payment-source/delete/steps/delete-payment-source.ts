import { createStep, StepResponse } from '@medusajs/framework/workflows-sdk'
import { WOMPI_MODULE_SERVICE } from 'src/modules/wompi'
import PaymentSourceService from 'src/modules/wompi/service'
import type { PaymentSourceRecord } from 'src/modules/wompi/types'

export const deletePaymentSourceStep = createStep(
	'delete-payment-source',
	async (paymentSourceRecord: PaymentSourceRecord, { container }) => {
		const wompiModuleService: PaymentSourceService = container.resolve(WOMPI_MODULE_SERVICE)
		const prevPaymentSource = paymentSourceRecord
		await wompiModuleService.deletePaymentSources(paymentSourceRecord)
		return new StepResponse(undefined, prevPaymentSource)
	},
	async (prevPaymentSource, { container }) => {
		const wompiModuleService: PaymentSourceService = container.resolve(WOMPI_MODULE_SERVICE)
		if (prevPaymentSource) {
			wompiModuleService.updatePaymentSources(prevPaymentSource)
		}
	}
)
