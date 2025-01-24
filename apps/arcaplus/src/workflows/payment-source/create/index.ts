import { createWorkflow, WorkflowResponse, when } from '@medusajs/framework/workflows-sdk'
import { createRemoteLinkStep } from '@medusajs/medusa/core-flows'
import { Modules } from '@medusajs/framework/utils'
import { createPaymentSourceStep } from './steps/create-payment-source'
import { PaymentSourceData } from 'src/modules/wompi/types'
import { WOMPI_MODULE_SERVICE } from 'src/modules/wompi'

export const createPaymentSourceWorkflow = createWorkflow(
	'create-payment-source',
	({ customerId, paymentSourceInput }: { customerId: string, paymentSourceInput: PaymentSourceData }) => {
		const paymentSource = createPaymentSourceStep(paymentSourceInput)
		when({ paymentSource }, ({ paymentSource }) => paymentSource !== undefined).then(() => {
			createRemoteLinkStep([{
				[WOMPI_MODULE_SERVICE]: {
					payment_source_id: paymentSource.id
				},
				[Modules.CUSTOMER]: {
					customer_id: customerId
				},
			}])
		})
		return new WorkflowResponse({ paymentSource })
	}
)
