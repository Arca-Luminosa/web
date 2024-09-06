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
