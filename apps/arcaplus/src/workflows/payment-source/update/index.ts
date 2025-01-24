import { createWorkflow, WorkflowResponse, when } from '@medusajs/framework/workflows-sdk'
import { PaymentSourceData, PaymentSourceRecord } from 'src/modules/wompi/types'
import { updatePaymentSourceStep } from './steps/update-payment-source'

export const updatePaymentSourceWorkflow = createWorkflow(
	'update-payment-source',
	({ paymentSourceRecord, paymentSourceData }: { paymentSourceRecord: PaymentSourceRecord, paymentSourceData: PaymentSourceData }) => {
		const paymentSource = updatePaymentSourceStep({
			paymentSourceRecord,
			paymentSourceData
		})
		return new WorkflowResponse({ paymentSource })
	}
)
