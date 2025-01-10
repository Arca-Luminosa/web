import { Metadata } from "next"
import { notFound } from "next/navigation"

import PaymentBook from "@modules/account/components/payment-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Payment sources",
  description: "View your payment sources",
}

export default async function PaymentSources(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="payment-sources-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Payment sources</h1>
        <p className="text-base-regular">
          View and update your payment sources, you can add as many as you
          like. Saving your payment sources will make them available during checkout.
        </p>
      </div>
      <PaymentBook customer={customer} region={region} />
    </div>
  )
}
