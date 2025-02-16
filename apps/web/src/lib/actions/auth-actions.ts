'use server'
import { z } from 'zod'

const RegisterSchema = z.object({
	name: z.string()
		.min(3, { message: 'El nombre debe tener al menos 3 caracteres'})
		.max(20, { message: 'El nombre debe tener menos de 20 caracteres' }),
	lastName: z.string()
		.min(3, { message: 'El apellido debe tener al menos 3 caracteres'})
		.max(20, { message: 'El apellido debe tener menos de 20 caracteres' }),
	username: z.string()
		.min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres'})
		.max(20, { message: 'El nombre de usuario debe tener menos de 20 caracteres' }),
	email: z.string()
		.email({ message: 'El correo debe ser válido' }),
	password: z.string()
	.min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
	.regex(/[a-zA-Z]/, { message: 'La contraseña debe tener al menos una letra' })
	.regex(/[0-9]/, { message: 'La contraseña debe tener al menos un número' })
	.regex(/[^a-zA-Z0-9]/, {
		message: 'La contraseña debe tener al menos un caracter especial',
	})
  .trim(),
})

type RegistrationData = z.infer<typeof RegisterSchema>

type FormState = | {
	errors?: {
		name?: string[]
		lastName?: string[]
		username?: string[]
		email?: string[]
		password?: string[]
	},
	inputs?: RegistrationData,
	message?: string,
} | undefined

export const registerUser = async (prevState: FormState, formData: FormData) => {
	const { name, lastName, username, email, password } = Object.fromEntries(formData) as RegistrationData
	const data = { name, lastName, username, email, password }
	const validatedFields = RegisterSchema.safeParse(data)

	if (!validatedFields.success) {
		return {
			...prevState,
			inputs: data,
			errors: validatedFields.error.flatten().fieldErrors,
			message: undefined
		}
	}

	return {
		...prevState,
		errors: undefined,
		inputs: data,
		message: undefined
	}
}
