import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { CardTokenRequest, CardTokenResponse, MerchantsResponse, PaymentSourceRequest, PaymentSourceResponse } from './wompi.types'

const baseURL = process.env.NEXT_PUBLIC_WOMPI_API_URL

const wompi = axios.create({
	baseURL
})

const wompiSS = axios.create({
	baseURL,
	headers: {
		Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`
	}
})

const wompiCS = axios.create({
	baseURL,
	headers: {
		Authorization: `Bearer ${process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY}`
	}
})

export const getAcceptanceTokens = async () => {
	const { data: { data: { presigned_acceptance, presigned_personal_data_auth } } } = await wompi.get<MerchantsResponse>(`/merchants/${process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY}`)
	return { presigned_acceptance, presigned_personal_data_auth }
}

export const createCardToken = async (cardData: CardTokenRequest) => {
	const { data } = await wompiCS.post<CardTokenResponse, AxiosResponse<CardTokenResponse>, CardTokenRequest>('/tokens/cards', cardData)
	return data
}

export const createPaymentSource = async (paymentSourceData: PaymentSourceRequest) => {
	const { data } = await wompiSS.post<PaymentSourceResponse, AxiosResponse<PaymentSourceResponse>, PaymentSourceRequest>("/payment_sources", paymentSourceData)
	return data
}
