import { useState } from 'react'
import Script from 'next/script'
import type { HttpTypes } from '@medusajs/types'
import { Button } from '@medusajs/ui'
import { placeOrder } from '@lib/data/cart'
import ErrorMessage from '../error-message'
import { TransactionStatuses, WompiWidgetObject, WompiWidgetTransaction } from './Wompi.types'

type WompiButtonProps = {
	cart: HttpTypes.StoreCart
	notReady: boolean
}

export const WompiButton = ({ cart, notReady }: WompiButtonProps) => {
	const [isReady, setIsReady] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const preparePaymentButton = () => {
		setIsReady(true)
	}

	const onPaymentCompleted = async () => {
		await placeOrder().catch((err) => {
			setErrorMessage(err.toString())
			setSubmitting(false)
		})
	}

	const handlePayment = (res: { transaction: WompiWidgetTransaction }) => {
		setSubmitting(true)
		if (!(res.transaction.status === TransactionStatuses.APPROVED || res.transaction.status === TransactionStatuses.PENDING)) {
			setErrorMessage(`An error occurred, transaction is ${res.transaction.status}`)
			setSubmitting(false)
			return
		}
		onPaymentCompleted()
	}

	const pay = () => {
		const session = cart.payment_collection?.payment_sessions?.find(
			(s) => s.status === "pending"
		)
		const widgetObject: WompiWidgetObject = {
			...(session?.data.widget as WompiWidgetObject),
			customerData: {
				email: `${cart.email}`,
				fullName: `${cart.billing_address?.first_name} ${cart.billing_address?.last_name}`,
				phoneNumber: `${cart.billing_address?.phone}`,
				phoneNumberPrefix: '+57',
				legalId: '123342112412',
				legalIdType: 'CC'
			},
			taxInCents: {
				vat: (cart.tax_total ?? 0) * 100,
				consumption: 0
			},
			shippingAddress: {
				addressLine1: cart.shipping_address?.address_1 ?? '',
				city: cart.shipping_address?.city ?? '',
				phoneNumber: cart.shipping_address?.phone ?? '',
				region: cart.shipping_address?.province ?? '',
				country: cart.shipping_address?.country_code!.toUpperCase() ?? 'CO'
			}
		}
		const checkoutObject = new WidgetCheckout(widgetObject);
		checkoutObject.open(handlePayment);
	}

	return <>
		<Script
			src="https://checkout.wompi.co/widget.js"
			onLoad={preparePaymentButton}
		></Script>
		<Button
			disabled={!isReady || notReady}
			isLoading={submitting}
			onClick={pay}
		>Pay with Wompi</Button>
		<ErrorMessage
			error={errorMessage}
			data-testid="manual-payment-error-message"
		/>
	</>
}
