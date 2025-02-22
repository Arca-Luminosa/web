'use server'
import { redirect } from 'next/navigation'
import { logInUser, registerUser } from '@/lib/services/strapi'
import { createSession, deleteSession } from '@/lib//services/session'
import type { UserResponse, UsersPermissionsLoginInput } from '@/lib/data/mutations/user.types'
import { LogInSchema, RegisterSchema } from './auth.schemas'
import type { LogInData, LogInFormState, RegisterFormState, RegistrationData } from './auth.types'

export const signUp = async (prevState: RegisterFormState, formData: FormData) => {
	const { name, lastName, username, email, password } = Object.fromEntries(formData) as RegistrationData
	const inputs = { name, lastName, username, email, password }
	const validatedFields = RegisterSchema.safeParse(inputs)

	if (!validatedFields.success) {
		return {
			...prevState,
			inputs,
			errors: validatedFields.error.flatten().fieldErrors,
			message: undefined
		}
	}

	let newUser: UserResponse

	try {
		newUser = await registerUser(inputs)
	} catch (err) {
		return {
			...prevState,
			errors: undefined,
			inputs,
			message: (err as Error).message,
		};
	}
	await createSession(newUser.jwt);
	redirect('/mi-cuenta')
}

export const logIn = async (prevState: LogInFormState, formData: FormData) => {
	const { identifier, password } = Object.fromEntries(formData) as LogInData
	const inputs = { identifier, password }
	const validatedFields = LogInSchema.safeParse(inputs);

	if (!validatedFields.success) {
		console.log(validatedFields)
		return {
			...prevState,
			inputs,
			errors: validatedFields.error.flatten().fieldErrors,
			message: undefined,
		};
	}

	let loggedInUser: UserResponse

	try {
		const logInObject: UsersPermissionsLoginInput = {
			...inputs,
			provider: 'local'
		}
		loggedInUser = await logInUser(logInObject)
	} catch (err) {
		return {
			...prevState,
			errors: undefined,
			inputs,
			message: (err as Error).message,
		};
	}
	await createSession(loggedInUser.jwt);
	redirect('/mi-cuenta');
}

export const logOut = async () => {
	await deleteSession()
	redirect('/login')
}
