import { useState } from 'react'
import Script from 'next/script'
import type { Cart } from 'medusa-react'
import { Button } from '@medusajs/ui'
import { placeOrder } from '@modules/checkout/actions'
import ErrorMessage from '../error-message'
import { TransactionStatuses, WompiWidgetObject, WompiWidgetTransaction } from './Wompi.types'

type WompiButtonProps = {
	cart: Cart
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
		if (res.transaction.status !== TransactionStatuses.APPROVED) {
			setErrorMessage('An error occurred')
			setSubmitting(false)
			return
		}
		onPaymentCompleted()
	}

	const pay = () => {
		const widgetObject: WompiWidgetObject = {
			...(cart.payment_session?.data as WompiWidgetObject),
			taxInCents: {
				vat: cart.tax_total ?? 0,
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
