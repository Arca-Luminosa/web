import axios, { AxiosResponse } from 'axios'
import type { WompiServerOptions, TransactionsResponse, VoidParams, VoidResponse, PaymentSourceRequest, PaymentSourceResponse } from './types'

export const wompiServer = ({ url, privateKey }: WompiServerOptions) => {
	const wompi = axios.create({
		baseURL: url,
		headers: {
			common: {
				Accept: 'application/json',
				Authorization: `Bearer ${privateKey}`,
			}
		}
	})

	const createPaymentSource = async (paymentSourceData: PaymentSourceRequest) => {
		try {
			const { data } = await wompi.post<PaymentSourceResponse, AxiosResponse<PaymentSourceResponse>, PaymentSourceRequest>("/payment_sources", paymentSourceData)
			return data
		} catch (error) {
			throw error
		}
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

	return { createPaymentSource, getTransaction, voidTransaction }
}
