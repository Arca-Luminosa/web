export type UserRegisterInput = {
	name: string
	lastName: string
	username: string
	email: string
	password: string
}

export type UsersPermissionsLoginInput = {
	provider: 'local'
	identifier: string
	password: string
}

type UserBasicInfo = {
	id: string
	username: string
	email: string
	name: string
	lastName: string
	blocked: boolean
}

export type UserResponse = {
	jwt: string
	user: UserBasicInfo
}

export type UserRegisterResponse = {
	register: UserResponse
}

export type UserLogInResponse = {
	login: UserResponse
}

type MutationInput<T> = {
	input: T
}

export type UserRegisterVariables = MutationInput<UserRegisterInput>

export type UserLoginVariables = MutationInput<UsersPermissionsLoginInput>
