import { EOL } from 'os';
import { AbstractPaymentProcessor, isPaymentProcessorError, PaymentProcessorContext, PaymentProcessorError, PaymentProcessorSessionResponse, PaymentSessionStatus } from '@medusajs/medusa'
import { createWompiWidgetObject } from './utils/wompi/wompi.utils';
import { getTransaction, voidTransaction } from './utils/wompi';
import { TransactionResponse, TransactionStatuses } from './utils/wompi/wompi.types';

class WompiWidgetService extends AbstractPaymentProcessor {
	constructor(container, options) {
		super(container)
	}

	static identifier = 'wompi-widget'

	async capturePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse['session_data']> {
		try {
      const transaction = (await this.retrievePayment(paymentSessionData)) as TransactionResponse
			console.log({transaction})
			if (transaction.status === TransactionStatuses.APPROVED) {
				return transaction
			}
			throw new Error('Payment is not approved yet')
    } catch (error) {
      return this.buildError('An error occurred in capturePayment', error)
    }
	}
	async authorizePayment(paymentSessionData: Record<string, unknown>, context: Record<string, unknown>): Promise<PaymentProcessorError | { status: PaymentSessionStatus; data: PaymentProcessorSessionResponse['session_data'] }> {
		try {
      const status = await this.getPaymentStatus(paymentSessionData)
      const transaction = (await this.retrievePayment(paymentSessionData)) as TransactionResponse
      return { data: transaction, status }
    } catch (error) {
      return this.buildError('An error occurred in authorizePayment', error)
    }
	}
	async cancelPayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse['session_data']> {
		try {
      const { id, amount_in_cents } = (await this.retrievePayment(paymentSessionData)) as TransactionResponse
			const { transaction } = await voidTransaction(id, amount_in_cents)
			return await this.retrievePayment(paymentSessionData)
    } catch (error) {
      return this.buildError('An error occurred in cancelPayment', error)
    }
	}
	async deletePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse['session_data']> {
		return paymentSessionData
	}
	async getPaymentStatus(paymentSessionData: Record<string, unknown>): Promise<PaymentSessionStatus> {
		const transaction = (await this.retrievePayment(paymentSessionData)) as TransactionResponse
		switch (transaction.status) {
			case TransactionStatuses.PENDING:
				return PaymentSessionStatus.PENDING
			case TransactionStatuses.DECLINED:
			case TransactionStatuses.VOIDED:
				return PaymentSessionStatus.CANCELED
			case TransactionStatuses.ERROR:
				return PaymentSessionStatus.ERROR
			case TransactionStatuses.APPROVED:
				return PaymentSessionStatus.AUTHORIZED
			default:
				return PaymentSessionStatus.PENDING
		}
	}
	async refundPayment(paymentSessionData: Record<string, unknown>, refundAmount: number): Promise<PaymentProcessorError | PaymentProcessorSessionResponse['session_data']> {
		try {
      const { id } = (await this.retrievePayment(paymentSessionData)) as TransactionResponse
			await voidTransaction(id, refundAmount)
			return await this.retrievePayment(paymentSessionData)
    } catch (error) {
      // return this.buildError('An error occurred in refundPayment', error)
			throw error
    }
	}
	async retrievePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProcessorError | TransactionResponse> {
		try {
      const { reference } = paymentSessionData
			const transaction = await getTransaction(reference as string)
			return transaction
    } catch (e) {
      return this.buildError('An error occurred in retrievePayment', e)
    }
	}
	async updatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | PaymentProcessorSessionResponse | void> {
		const session_data = await createWompiWidgetObject(context)
		return {
			session_data
		}
	}
	updatePaymentData(sessionId: string, data: Record<string, unknown>): Promise<PaymentProcessorError | PaymentProcessorSessionResponse['session_data']> {
		throw new Error('updatePaymentData method not implemented.')
	}

	async initiatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorError | PaymentProcessorSessionResponse> {
		const session_data = await createWompiWidgetObject(context)
		return {
			session_data
		}
	}

	protected buildError(
    message: string,
    e: PaymentProcessorError | Error
  ): PaymentProcessorError {
    return {
      error: message,
      code: 'code' in e ? e.code : '',
      detail: isPaymentProcessorError(e)
        ? `${e.error}${EOL}${e.detail ?? ''}`
        : e.message ?? '',
    }
  }
}

export default WompiWidgetService
