import axios, { AxiosResponse, isAxiosError } from 'axios'
import type { TransactionsResponse, VoidParams, VoidResponse } from './wompi.types'

const wompi = axios.create({
	baseURL: process.env.WOMPI_API_URL,
	headers: {
		common: {
			Accept: 'application/json',
			Authorization: `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
		}
	}
})

export const getTransaction = async (ref: string) => {
	try {
		const { data: { data: transactions } } = await wompi.get<TransactionsResponse>(`/transactions?reference=${ref}`)
		return transactions[0]
	} catch (error) {
		throw error
	}
}

export const voidTransaction = async (id: string, amount: number) => {
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
