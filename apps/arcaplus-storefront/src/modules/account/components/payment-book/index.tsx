import React from "react"


import PaymentSource from "../payment-source-card/payment-source"
import { HttpTypes } from "@medusajs/types"
import { getPaymentSource } from "@lib/data/payment-sources"

type PaymentBookProps = {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
}

const PaymentBook: React.FC<PaymentBookProps> = async ({ customer }) => {
	const paymentSource = await getPaymentSource()
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-4">
        <PaymentSource email={customer.email} savedPaymentSource={paymentSource} />
      </div>
    </div>
  )
}

export default PaymentBook
