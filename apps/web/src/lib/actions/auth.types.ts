import { z } from 'zod'
import { LogInSchema, RegisterSchema } from './auth.schemas'

export type RegistrationData = z.infer<typeof RegisterSchema>

export type RegisterFormState =
	| {
			errors?: {
				name?: string[]
				lastName?: string[]
				username?: string[]
				email?: string[]
				password?: string[]
			}
			inputs?: RegistrationData
			message?: string
	  }
	| undefined

export type LogInData = z.infer<typeof LogInSchema>

export type LogInFormState =
	| {
			errors?: {
				identifier?: string[]
				password?: string[]
			}
			inputs?: LogInData
			message?: string
		}
	| undefined
