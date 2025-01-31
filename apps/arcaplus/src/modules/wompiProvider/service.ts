import { AbstractPaymentProvider, MedusaError, PaymentSessionStatus } from '@medusajs/framework/utils'
import type { WompiPaymentSessionData, WompiProviderOptions } from './types'
import type { PaymentProviderError, PaymentProviderSessionResponse, CreatePaymentProviderSession, UpdatePaymentProviderSession, ProviderWebhookPayload, WebhookActionResult, Logger, PaymentProviderContext, PaymentMethodResponse } from '@medusajs/framework/types'
import { wompiClient } from './utils/wompi'
import { TransactionResponse, TransactionStatuses } from './types.d'


type InjectedDependencies = {
  logger: Logger
}

class WompiPaymentProviderService extends AbstractPaymentProvider<WompiProviderOptions> {
	static identifier = 'wompi'
	protected logger_: Logger
	protected options_: WompiProviderOptions
	protected wompi: ReturnType<typeof wompiClient>

	constructor(container: InjectedDependencies, options: WompiProviderOptions) {
		super(container, options)
		this.logger_ = container.logger
		this.options_ = options
		this.wompi = wompiClient(options)
	}

	static validateOptions({ url, publicKey, privateKey, integritySecret }: WompiProviderOptions) {
		if(!url) {
			throw new MedusaError(MedusaError.Types.INVALID_DATA, 'url is required in Wompi provider\'s options')
		}
		if(!publicKey) {
			throw new MedusaError(MedusaError.Types.INVALID_DATA, 'publicKey is required in Wompi provider\'s options')
		}
		if(!privateKey) {
			throw new MedusaError(MedusaError.Types.INVALID_DATA, 'privateKey is required in Wompi provider\'s options')
		}
		if(!integritySecret) {
			throw new MedusaError(MedusaError.Types.INVALID_DATA, 'integritySecret is required in Wompi provider\'s options')
		}
	}

	async capturePayment({ reference }: TransactionResponse): Promise<PaymentProviderError | TransactionResponse> {
		try {
			const transaction = await this.wompi.getTransaction(reference)
			if (transaction.status === TransactionStatuses.APPROVED) {
				return transaction
			}
			throw new Error('Payment is not approved yet')
    } catch (error) {
      return {
				error: 'An error occurred capturing the payment',
				code: 'unknown',
				detail: error
			}
    }
	}

	async authorizePayment(paymentSessionData: WompiPaymentSessionData, context: Record<string, unknown>): Promise<PaymentProviderError | { status: PaymentSessionStatus; data: TransactionResponse }> {
		try {
      const status = await this.getPaymentStatus(paymentSessionData)
			const transaction = await this.retrievePayment(paymentSessionData)
			if ('error' in transaction) {
				throw new Error(transaction.error)
			}
			return {
				data: transaction,
				status: status === PaymentSessionStatus.AUTHORIZED ? PaymentSessionStatus.CAPTURED : status
			}
    } catch (error) {
      return {
				error: 'An error occurred authorizing the payment',
				code: 'unknown',
				detail: error
			}
    }
	}

	async cancelPayment({ id, amount_in_cents }: TransactionResponse): Promise<PaymentProviderError | TransactionResponse> {
		try {
			console.info('Canceling payment...');
			const { transaction } = await this.wompi.voidTransaction(id, amount_in_cents)
			return transaction
    } catch (error) {
      return {
				error: 'An error occurred canceling the payment',
				code: 'unknown',
				detail: error
			}
    }
	}

	async initiatePayment(context: CreatePaymentProviderSession): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
		try {
			const widget = await this.wompi.createWidgetObject(context)
			return {
				data: {
					widget
				}
			}
		} catch(e) {
			return {
				error: e,
				code: 'unknown',
				detail: e
			}
		}
	}

	async deletePayment(paymentSessionData: WompiPaymentSessionData): Promise<PaymentProviderError | PaymentProviderSessionResponse['data']> {
		return paymentSessionData
	}

	async getPaymentStatus(paymentSessionData: WompiPaymentSessionData): Promise<PaymentSessionStatus> {
		try {
			const transaction = (await this.retrievePayment(paymentSessionData))
			if ('status' in transaction) {
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
			throw new Error(transaction.error)
		} catch (e) {
			console.error(e)
			return PaymentSessionStatus.ERROR
		}
	}

	async refundPayment({ id, amount_in_cents }: TransactionResponse, refundAmount: number): Promise<PaymentProviderError | TransactionResponse> {
		try {
			console.info('Voiding payment...');
			const { transaction } = await this.wompi.voidTransaction(id, amount_in_cents)
			return transaction
    } catch (error) {
      return {
				error: 'An error occurred refunding the payment',
				code: 'unknown',
				detail: error
			}
    }
	}

	async retrievePayment({ widget }: WompiPaymentSessionData): Promise<PaymentProviderError | TransactionResponse> {
		try {
      const { reference } = widget
			const transaction = await this.wompi.getTransaction(reference)
			return transaction
    } catch (e) {
      return {
				error: e,
				code: 'unknown',
				detail: e
			}
    }
	}

	async updatePayment(context: UpdatePaymentProviderSession): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
		console.info(context.data)
		try {
			const widget = await this.wompi.createWidgetObject(context)
			return {
				data: {
					widget
				}
			}
		} catch(e) {
			return {
				error: e,
				code: 'unknown',
				detail: e
			}
		}
	}

	// async listPaymentMethods(context: PaymentProviderContext): Promise<PaymentMethodResponse[]> {
	// 	try {
	// 		const { customer } = context
	// 		console.log({ customer })
	// 		// ToDo: Adjust later, this is not the confirmed way to get the payment methods from the customer here
	// 		const paymentMethod = customer?.['payment_methods'][0]
	// 		return [{
	// 			id: paymentMethod.id,
	// 			data: paymentMethod.data
	// 		}]
	// 	} catch(e) {
	// 		return []
	// 	}
	// }

	getWebhookActionAndData(data: ProviderWebhookPayload['payload']): Promise<WebhookActionResult> {
		throw new Error('Method getWebhookActionAndData not implemented.')
	}
}

export default WompiPaymentProviderService
