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

export type PaymentSourceRecord = {
	id: string,
	data: PaymentSourceData
	created_at: string | Date
	updated_at: string | Date
	deleted_at: string | Date | null
}
