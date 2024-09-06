import type { PaymentProcessorContext } from '@medusajs/medusa'
import type { WompiWidgetObject } from './wompi.types'

export const createSignature = async (ref: string, amount: number, currency: string, expirationTime: string = '') => {
	const integritySecret = process.env.WOMPI_INTEGRITY_SECRET
	const rawSignature = `${ref}${amount}${currency}${expirationTime}${integritySecret}`
	const encondedText = new TextEncoder().encode(rawSignature)
	const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	const signedSignature = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
	return signedSignature
}

export const createWompiWidgetObject = async ({
	currency_code,
	amount,
	resource_id,
	customer
}: PaymentProcessorContext) => {
	const publicKey = process.env.WOMPI_PUBLIC_KEY
	const currency = currency_code.toUpperCase()
	const signature	= await createSignature(resource_id, amount, currency)
	const widgetObject: WompiWidgetObject = {
		currency,
		amountInCents: amount,
		reference: resource_id,
		publicKey,
		signature: {
			integrity: signature
		},
		customerData: {
			email: customer.email,
			fullName: `${customer.first_name} ${customer.last_name}`,
			phoneNumber: customer.phone,
			phoneNumberPrefix: '+57',
			legalId: customer.metadata?.legal_id as string,
			legalIdType: customer.metadata?.legal_id_type as WompiWidgetObject['customerData']['legalIdType']
		}
	}

	return widgetObject
}
