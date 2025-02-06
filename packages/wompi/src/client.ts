import axios, { type AxiosResponse } from 'axios'
import type { CardTokenRequest, CardTokenResponse, MerchantsResponse, WidgetData, WompiClientOptions, WompiWidgetObject } from './types'
import { createSignature } from './utils'

export const wompiClient = ({ url, publicKey, integritySecret }: WompiClientOptions) => {
	const wompi = axios.create({
		url,
		headers: {
			Authorization: `Bearer ${publicKey}`
		}
	})

	const createCardToken = async (cardData: CardTokenRequest) => {
		const { data } = await wompi.post<CardTokenResponse, AxiosResponse<CardTokenResponse>, CardTokenRequest>('/tokens/cards', cardData)
		return data
	}

	const getAcceptanceTokens = async () => {
		try {
			const { data: { data: { presigned_acceptance, presigned_personal_data_auth } } } = await axios.get<MerchantsResponse>(`${url}/merchants/${publicKey}`)
			return { presigned_acceptance, presigned_personal_data_auth }
		} catch (error) {
			throw error
		}
	}
	const createWidgetObject = async ({
		currencyCode,
		amountInCents,
		reference
	}: WidgetData) => {
		const currency = currencyCode.toUpperCase()
		const integrity	= await createSignature(integritySecret, reference, amountInCents, currency)
		const widgetObject: WompiWidgetObject = {
			currency,
			amountInCents,
			reference,
			publicKey,
			signature: {
				integrity
			}
		}
		return widgetObject
	}
	return { createCardToken, createWidgetObject, getAcceptanceTokens }
}
