import {
  BeforeInsert,
  Column,
  Entity,
	ManyToOne,
	JoinColumn
} from 'typeorm'
import { BaseEntity, Customer } from '@medusajs/medusa'
import { DbAwareColumn, generateEntityId } from '@medusajs/medusa/dist/utils'
// import { Customer } from './customer'
import type { CardTokenData } from 'src/services/utils/wompi/wompi.types'

@Entity()
export class WompiPaymentMethod extends BaseEntity {
  @Column({ type: 'varchar' })
  status: string

	@DbAwareColumn({ type: 'jsonb'})
	data: CardTokenData

	@ManyToOne(() => Customer)
	// @JoinColumn({ name: 'customer_id'})
	customer: Customer

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'wompi_payment_method')
  }
}
