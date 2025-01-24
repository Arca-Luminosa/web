import { createWorkflow, WorkflowResponse, when } from '@medusajs/framework/workflows-sdk'
import { removeRemoteLinkStep } from '@medusajs/medusa/core-flows'
import { deletePaymentSourceStep } from './steps/delete-payment-source'
import type { PaymentSourceRecord } from 'src/modules/wompi/types'
import { WOMPI_MODULE_SERVICE } from 'src/modules/wompi'

export const deletePaymentSourceWorkflow = createWorkflow(
	'delete-payment-source',
	({ paymentSourceRecord }: { paymentSourceRecord: PaymentSourceRecord }) => {
		const paymentSource = deletePaymentSourceStep(paymentSourceRecord)
		when({ paymentSource }, ({ paymentSource }) => paymentSource === undefined).then(() => {
			removeRemoteLinkStep([{
				[WOMPI_MODULE_SERVICE]: {
					payment_source_id: paymentSourceRecord.id
				}
			}])
		})
		return new WorkflowResponse({ paymentSource })
	}
)
