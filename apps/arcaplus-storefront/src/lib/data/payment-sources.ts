'use server'

import { sdk } from '@lib/config'
import { revalidateTag } from 'next/cache'
import { getAuthHeaders, getCacheOptions, getCacheTag } from './cookies'
import { CardTokenRequest, CardTokenResponse, MedusaPaymentSourceResponse, PaymentSourceData, PaymentSourceDeletedResponse, PaymentSourceRequest } from '@lib/services/wompi.types'
import { createCardToken, createPaymentSource } from '@lib/services/wompi'
import { isAxiosError } from 'axios'

const paymentSourcesEndpoint = '/store/customers/me/payment-sources'

export const getPaymentSource = async () => {
	try {
		const headers = {
			...(await getAuthHeaders()),
		}
		const { data } = await sdk.client.fetch<MedusaPaymentSourceResponse>(paymentSourcesEndpoint, {
			method: 'GET',
			headers,
		})
		return data
	} catch (e) {
		console.info('Error retrieving payment source', (e as Error).message)
		return undefined
	}
}

export const deletePaymentSource = async () => {
	try {
		const headers = {
			...(await getAuthHeaders()),
		}
		const next = {
			...(await getCacheOptions('payment-sources')),
		}
		const { message } = await sdk.client.fetch<PaymentSourceDeletedResponse>(paymentSourcesEndpoint, {
			method: 'DELETE',
			headers,
			next
		})
		const paymentSourcesCacheTag = await getCacheTag('payment-sources')
		revalidateTag(paymentSourcesCacheTag)
		return message
	} catch (e) {
		console.error('Error deleting payment source', (e as Error).message)
	}
}

export const addPaymentSource = async (_currentState: unknown, formData: FormData) => {
	const data = {
		card_holder: formData.get('card_holder') as string,
		number: formData.get('number') as string,
		exp_month: formData.get('exp_month') as string,
		exp_year: formData.get('exp_year') as string,
		cvc: formData.get('cvc') as string,
		acceptance_token: formData.get('acceptance_token') as string,
		accept_personal_auth: formData.get('accept_personal_auth') as string,
		customer_email: formData.get('customer_email') as string,
	}

	const cardData: CardTokenRequest = {
		card_holder: data.card_holder,
		number: data.number,
		exp_month: data.exp_month,
		exp_year: data.exp_year,
		cvc: data.cvc,
	}

	let token: CardTokenResponse
	let paymentSource: PaymentSourceData

	try {
		token = await createCardToken(cardData)
	} catch (e) {
		if (isAxiosError(e)) {
			const errors = e.response?.data.error.messages
			const message = 'number' in errors ? errors.number.join(',') : 'Hubo un error creando el token de la tarjeta'
			console.error('Error creating card token', message)
			return { success: false, error: message }
		}
		return { success: false, error: (e as Error).toString() }
	}

	try {
		const paymentSourceData: PaymentSourceRequest = {
			type: 'CARD',
			token: token.data.id,
			customer_email: data.customer_email,
			acceptance_token: data.acceptance_token,
			accept_personal_auth: data.accept_personal_auth,
		}

		const { data: paymentSourceResponse } = await createPaymentSource(paymentSourceData)
		paymentSource = paymentSourceResponse
	} catch (e) {
		if (isAxiosError(e)) {
			const errors = e.response?.data.error.messages
			console.error('Error creating payment source', errors)
		}
		return { success: false, error: (e as Error).toString() }
	}

	try {
		const headers = {
			...(await getAuthHeaders()),
		}
		const next = {
			...(await getCacheOptions('payment-sources')),
		}
		const { data } = await sdk.client.fetch<MedusaPaymentSourceResponse>(paymentSourcesEndpoint, {
			method: 'POST',
			body: paymentSource,
			headers,
			next,
		})
		const paymentSourcesCacheTag = await getCacheTag('payment-sources')
		revalidateTag(paymentSourcesCacheTag)
		return { success: true, error: null, data }
	} catch (e) {
		console.error('Error saving payment source', (e as Error).message)
		return { success: false, error: (e as Error).toString() }
	}
}
