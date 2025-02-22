import { z } from 'zod'

export const RegisterSchema = z.object({
	name: z.string().min(3, { message: 'Debe tener al menos 3 caracteres' }).max(20, { message: 'Debe tener menos de 20 caracteres' }),
	lastName: z.string().min(3, { message: 'Debe tener al menos 3 caracteres' }).max(20, { message: 'Debe tener menos de 20 caracteres' }),
	username: z.string().min(3, { message: 'Debe tener al menos 3 caracteres' }).max(20, { message: 'Debe tener menos de 20 caracteres' }),
	email: z.string().email({ message: 'El correo debe ser válido' }),
	password: z
		.string()
		.min(6, { message: 'Debe tener al menos 6 caracteres' })
		.regex(/[a-zA-Z]/, { message: 'Debe tener al menos una letra' })
		.regex(/[0-9]/, { message: 'Debe tener al menos un número' })
		.regex(/[^a-zA-Z0-9]/, {
			message: 'Debe tener al menos un caracter especial',
		})
		.trim(),
})

export const LogInSchema = z.object({
	identifier: z.string().nonempty({ message: 'No puede estar vacío' }),
	password: z.string().nonempty({ message: 'No puede estar vacío' }),
});
