import React from "react"


import AddPaymentSource from "../payment-source-card/add-payment-source"
// import EditAddress from "../address-card/edit-address-modal"
import { HttpTypes } from "@medusajs/types"

type PaymentBookProps = {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
}

const PaymentBook: React.FC<PaymentBookProps> = ({ customer, region }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-4">
        <AddPaymentSource email={customer.email} />
        {/* {customer.addresses.map((address) => {
          return (
            <EditAddress region={region} address={address} key={address.id} />
          )
        })} */}
      </div>
    </div>
  )
}

export default PaymentBook
