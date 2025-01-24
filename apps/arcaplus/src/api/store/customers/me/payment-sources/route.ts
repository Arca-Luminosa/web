import type { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'
import type { PaymentSourceData, PaymentSourceRecord } from 'src/modules/wompi/types';
import { createPaymentSourceWorkflow } from 'src/workflows/payment-source/create';
import { deletePaymentSourceWorkflow } from 'src/workflows/payment-source/delete';
import { updatePaymentSourceWorkflow } from 'src/workflows/payment-source/update';

const getPaymentSource = async (req: AuthenticatedMedusaRequest, customerId: string) => {
	const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

	const { data: [customer] } = await query.graph({
		entity: 'customer',
		fields: [
			'payment_sources.*'
		],
		filters: {
			id: [customerId]
		}
	})

	const [paymentSource] = customer.payment_sources ?? []
	return paymentSource
}

export const GET = async (
	req: AuthenticatedMedusaRequest,
	res: MedusaResponse
) => {
	const customerId = req.auth_context.actor_id
	const paymentSource = await getPaymentSource(req, customerId)

	if (paymentSource) {
		res.json(paymentSource ?? {})
	} else {
		res.status(404).json({ message: 'Payment source not found for current user' })
	}
}

export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
): Promise<void> {
	const customerId = req.auth_context.actor_id
	const paymentSourceRecord = await getPaymentSource(req, customerId)

	if (paymentSourceRecord) {
		const { result: { paymentSource } } = await updatePaymentSourceWorkflow(req.scope).run({
			input: {
				paymentSourceRecord: paymentSourceRecord as unknown as PaymentSourceRecord,
				paymentSourceData: req.body as PaymentSourceData
			}
		})
		res.json(paymentSource)
	} else {
		const { result: { paymentSource } } = await createPaymentSourceWorkflow(req.scope).run({
			input: {
				customerId,
				paymentSourceInput: req.body as PaymentSourceData
			}
		})
		res.status(201).json({ ...paymentSource })
	}
}

export async function DELETE(
	req: AuthenticatedMedusaRequest,
	res: MedusaResponse
): Promise<void> {
	const customerId = req.auth_context.actor_id
	const paymentSourceRecord = await getPaymentSource(req, customerId)

	if (paymentSourceRecord) {
		await deletePaymentSourceWorkflow(req.scope).run({
			input: {
				paymentSourceRecord: paymentSourceRecord as unknown as PaymentSourceRecord,
			}
		})
		res.json({ message: 'Payment source successfully deleted' })
	} else {
		res.status(404).json({ message: 'Payment source not found for current user' })
	}
}
