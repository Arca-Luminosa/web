import axios, { AxiosResponse } from 'axios'
import type { CreatePaymentProviderSession } from '@medusajs/framework/types'
import type { WompiProviderOptions, TransactionsResponse, VoidParams, VoidResponse, WompiWidgetObject } from '../../types'

export const wompiClient = ({ url, publicKey, privateKey, integritySecret }: WompiProviderOptions) => {
	const wompi = axios.create({
		baseURL: url,
		headers: {
			common: {
				Accept: 'application/json',
				Authorization: `Bearer ${privateKey}`,
			}
		}
	})

	const createSignature = async (ref: string, amountInCents: number, currency: string, expirationTime: string = '') => {
		const rawSignature = `${ref}${amountInCents}${currency}${expirationTime}${integritySecret}`
		const encondedText = new TextEncoder().encode(rawSignature)
		const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText)
		const hashArray = Array.from(new Uint8Array(hashBuffer))
		const signedSignature = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
		return signedSignature
	}

	const createWidgetObject = async ({
		currency_code,
		amount,
		context
	}: CreatePaymentProviderSession) => {
		const currency = currency_code.toUpperCase()
		const reference = context.session_id ?? ''
		const amountInCents = (amount as number) * 100
		const signature	= await createSignature(reference, amountInCents, currency)
		const widgetObject: WompiWidgetObject = {
			currency,
			amountInCents,
			reference,
			publicKey,
			signature: {
				integrity: signature
			}
		}

		return widgetObject
	}

	const getTransaction = async (ref: string) => {
		try {
			const { data: { data: transactions } } = await wompi.get<TransactionsResponse>(`/transactions?reference=${ref}`)
			return transactions[0]
		} catch (error) {
			throw error
		}
	}

	const voidTransaction = async (id: string, amount: number) => {
		try {
			const { data: { data } } = await wompi.post<VoidResponse, AxiosResponse<VoidResponse>, VoidParams>(`/transactions/${id}/void`, {
				amount_in_cents: amount
			})
			if ('status' in data && 'transaction' in data) {
				return data
			}
			throw new Error(data.reason)
		} catch (error) {
			throw error
		}
	}

	return { createWidgetObject, getTransaction, voidTransaction }
}
