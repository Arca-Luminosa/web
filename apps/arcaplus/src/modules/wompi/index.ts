import { Module } from '@medusajs/framework/utils'
import PaymentSourceModuleService from './service'

export const WOMPI_MODULE_SERVICE = 'wompiModuleService'

export default Module(WOMPI_MODULE_SERVICE, {
	service: PaymentSourceModuleService
})
