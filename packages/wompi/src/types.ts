type WompiOptions = {
	url: string
	integritySecret: string
}
export type WompiServerOptions = WompiOptions & {
	privateKey: string
}

export type WompiClientOptions = WompiOptions & {
	publicKey: string
}

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

type CardBrand = 'VISA' | 'MASTERCARD' | 'AMEX'

type LegalId = 'CC' | 'CE' | 'NIT' | 'PP' | 'TI' | 'DNI' | 'RG' | 'OTHER'

type Address = {
	addressLine1: string
	city: string
	phoneNumber: string
	region: string
	country: string
}

type ThreeDsAuth = {
  current_step: string
  current_step_status: string
}

type PaymentMethodExtra = {
	bin: string;
	name: string;
	brand: string;
	exp_year: string;
	card_type: string;
	exp_month: string;
	last_four: string;
	card_holder: string;
	is_three_ds: boolean;
	unique_code: string;
	three_ds_auth: {
		three_ds_auth: ThreeDsAuth
	}
	external_identifier: string;
	processor_response_code: string;
}

export type TransactionResponse = {
	id: string
	created_at: string
	finalized_at: string
	amount_in_cents: number
	reference: string
	customer_email: string
	currency: string
	payment_method_type: `${PaymentMethods}`
	payment_method: {
		type: `${PaymentMethods}`
		extra: PaymentMethodExtra
		token: string
		installments: number
	}
	status: `${TransactionStatuses}`
	status_message?: string
	shipping_address?: Address
	redirect_url?: string
	payment_source_id?: string
	payment_link_id?: string
	customer_data?: {
		full_name: string
		phone_number: string
	}
	billing_data?: {
		legal_id_type: `${LegalId}`;
		legal_id: string;
	}
	bill_id?: string
	taxes?: {
		type: 'VAT' | 'CONSUMPTION'
		amount_in_cents: number
	}[]
	tip_in_cents?: number
}

export type TransactionsResponse = {
	data: TransactionResponse[]
	meta: {}
}

export type WidgetData = {
	currencyCode: string
	amountInCents: number
	reference: string
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

export type VoidParams = {
	amount_in_cents: number
}

export type VoidApprovedResponse = {
	status: `${TransactionStatuses.APPROVED}`,
	status_message?: string,
	transaction: TransactionResponse
}

type VoidUnprocessableResponse = {
	type: 'unprocessable'
	reason: string
}

export type VoidResponse = {
	data: VoidApprovedResponse | VoidUnprocessableResponse
	meta: {}
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
