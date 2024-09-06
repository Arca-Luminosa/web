export enum TransactionStatuses {
	PENDING = 'PENDING',
	APPROVED = 'APPROVED',
	DECLINED = 'DECLINED',
	VOIDED = 'VOIDED',
	ERROR = 'ERROR',
}

enum PaymentMethods {
	CARD = 'CARD',
	NEQUI = 'NEQUI',
	PSE = 'PSE',
	BANCOLOMBIA = 'BANCOLOMBIA',
	BANCOLOMBIA_TRANSFER = 'BANCOLOMBIA_TRANSFER',
	BANCOLOMBIA_COLLECT = 'BANCOLOMBIA_COLLECT',
	BANCOLOMBIA_QR = 'BANCOLOMBIA_QR'
}

type LegalId = 'CC' | 'CE' | 'NIT' | 'PP' | 'TI' | 'DNI' | 'RG' | 'OTHER'

type Address = {
	addressLine1: string
	city: string
	phoneNumber: string
	region: string
	country: string
}

export type WompiWidgetObject = {
	currency: string
	amountInCents: number
	reference: string
	publicKey: string
	signature: {
		integrity: string
	}
	redirectUrl?: string
	expirationTime?: string
	taxInCents?: {
		vat: number
		consumption: number
	}
	customerData?: {
		email: string
		fullName: string
		phoneNumber: string
		phoneNumberPrefix: string
		legalId?: string
		legalIdType?: LegalId
	}
	shippingAddress?: Address
}

export type WompiWidgetTransaction = {
	redirectUrl?: string
	amountInCents: number
	reference: string
	currency: string
	signature: string
	shippingAddress?: Address
	taxes: [unknown]
	customerData: {
		fullName: string
		phoneNumber: string
	}
	customerEmail: string
	merchantUserId: string
	sessionId: string
	paymentMethodType: `${PaymentMethods}`
	customerNumberPrefix: string
	paymentMethod: {
		type: `${PaymentMethods}`
		extra: {
			name: string
			brand: string
			cardType: string
			lastFour: string
			isThreeDs: boolean
			threeDsAuth?: {
				threeDsAuth: {
					currentStep: string
					currentStepStatus: string
				}
			}
			externalIdentifier: string
			processorResponseCode: string
		}
		installments: number
	}
	billingData: {
		legalIdType: LegalId
		legalId: string
	}
	is_three_ds: boolean
	id: string
	createdAt: string
	finalizedAt: string
	status: `${TransactionStatuses}`
	statusMessage?: string
	paymentSourceId?: string
	paymentLinkId?: string
	billId?: string
	tipInCents?: string
	merchant: {
		id: number
		name: string
		legalName: string
		contactName: string
		phoneNumber: string
		logoUrl?: string
		legalIdType: LegalId
		email: string
		legalId: string
		publicKey: string
	}
	canRetry: boolean
	signatureIntegrityRetry?: string
}
