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
	BANCOLOMBIA_QR = 'BANCOLOMBIA_QR',
	BANCOLOMBIA_BNPL = 'BANCOLOMBIA_BNPL',
	DAVIPLATA = 'DAVIPLATA',
	SU_PLUS = 'SU_PLUS'
}

type CardBrand = 'VISA' | 'MASTERCARD' | 'AMEX'

type LegalId = 'CC' | 'CE' | 'NIT' | 'PP' | 'TI' | 'DNI' | 'RG' | 'OTHER'

type PresignedToken = {
	acceptance_token: string
	permalink: string
}

type PresignedAcceptance = PresignedToken & {
	type: 'END_USER_POLICY'
}

type PresignedPersonalDataAuth = PresignedToken & {
	type: 'PERSONAL_DATA_AUTH'
}

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

export type MerchantsResponse = {
	data: {
		id: number
		name: string
		email: string
		contact_name: string
		phone_number: string
		active: boolean
		logo_url: null | string
		legal_name: string
		legal_id_type: LegalId
		legal_id: string
		public_key: string
		accepted_currencies: string[]
		fraud_javascript_key: null | string
		fraud_groups: string[]
		accepted_payment_methods: `${PaymentMethods}`[]
		payment_methods: {
			name: `${PaymentMethods}`,
			payment_processors: {
				name: string
			}[]
		}[]
		presigned_acceptance: PresignedAcceptance
		presigned_personal_data_auth: PresignedPersonalDataAuth
	}
	meta: {}
}

export type CardTokenRequest = {
	number: string
	exp_month: string
	exp_year: string
	cvc: string
	card_holder: string
}

export type CardTokenResponse = {
	status: 'CREATED'
	data: {
		id: string
		created_at: string
		brand: CardBrand
		name: string
		last_four: string
		bin: string
		exp_year: string
		exp_month: string
		card_holder: string
		created_with_cvc: boolean
		expires_at: string
		validity_ends_at: string
	}
}

export type PaymentSourceRequest = {
	type: `${PaymentMethods}`
	token: string
	customer_email: string
	acceptance_token: string
	accept_personal_auth: string
}

export type PaymentSourceData = {
	id: number
	public_data: {
		bin: string
		last_four: string
		exp_month: string
		exp_year: string
		card_holder: string
		validity_ends_at: string
		type: `${PaymentMethods}`
	}
	token: string
	type: `${PaymentMethods}`
	status: 'AVAILABLE'
	customer_email: string
}

export type PaymentSourceResponse = {
	data: PaymentSourceData
	meta: {}
}

export type MedusaPaymentSourceResponse = {
	id: string
	data: PaymentSourceData
	created_at: string | Date
	updated_at: string | Date
	deleted_at: string | Date | null
}

export type PaymentSourceDeletedResponse = {
	message: string
}
