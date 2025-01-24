import {
  createStep,
  StepResponse
} from '@medusajs/framework/workflows-sdk'
import {
  WOMPI_MODULE_SERVICE
} from 'src/modules/wompi'
import WompiModuleService from 'src/modules/wompi/service'
import type { PaymentSourceData, PaymentSourceRecord } from 'src/modules/wompi/types'

export const updatePaymentSourceStep = createStep(
  'update-subscription',
  async ({ paymentSourceRecord, paymentSourceData }: { paymentSourceRecord: PaymentSourceRecord, paymentSourceData: PaymentSourceData }, { container }) => {
    const wompiModuleService: WompiModuleService =
      container.resolve(
        WOMPI_MODULE_SERVICE
      )

    const prevPaymentSource = paymentSourceRecord

		const updatedPaymentSource: PaymentSourceRecord = await wompiModuleService.updatePaymentSources({
			id: paymentSourceRecord.id,
			data: paymentSourceData
		})

    return new StepResponse(updatedPaymentSource, prevPaymentSource)
  },
  async (prevPaymentSource, { container }) => {
    const wompiModuleService: WompiModuleService =
      container.resolve(
        WOMPI_MODULE_SERVICE
      )

    await wompiModuleService.updatePaymentSources({
      ...prevPaymentSource
    })
  }
)
