import { Entity, OneToMany } from 'typeorm'
import { Customer as MedusaCustomer } from '@medusajs/medusa'
import { WompiPaymentMethod } from './wompiPaymentMethod'

@Entity()
export class Customer extends MedusaCustomer {
  @OneToMany(() => WompiPaymentMethod, (paymentMethods) => paymentMethods)
  payment_methods: WompiPaymentMethod[]
}
