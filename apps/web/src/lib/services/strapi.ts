import { ApolloError, HttpLink, isApolloError } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { LOGIN, REGISTER_USER } from '../data/mutations';
import type { UserLogInResponse, UserLoginVariables, UserRegisterInput, UserRegisterResponse, UserRegisterVariables, UsersPermissionsLoginInput } from '../data/mutations/user.types';

const { STRAPI_TOKEN } = process.env;

const httpLink = new HttpLink({
	uri: `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => ({
	headers: {
		...headers,
		Authorization: STRAPI_TOKEN ? `Bearer ${STRAPI_TOKEN}` : '',
	},
}));

const { getClient } = registerApolloClient(
	() =>
		new ApolloClient({
			cache: new InMemoryCache(),
			link: authLink.concat(httpLink),
		})
);

export const registerUser = async (input: UserRegisterInput) => {
	try {
		const { data } = await getClient().mutate<UserRegisterResponse, UserRegisterVariables>({
			mutation: REGISTER_USER,
			variables: {
				input
			}
		})
		if (data) {
			return data.register
		}
		throw new Error('No data returned')
	} catch (err) {
		if (isApolloError(err as Error)) {
			const { message } = err as ApolloError
			const errorMessage = message === 'Email or Username are already taken' ? 'El correo o el nombre de usuario ya están en uso' : message;
			throw new Error(errorMessage);
		} else {
			throw err
		}
	}
}

export const logInUser = async (input: UsersPermissionsLoginInput) => {
	try {
		const { data } = await getClient().mutate<UserLogInResponse, UserLoginVariables>({
			mutation: LOGIN,
			variables: {
				input
			}
		})
		if (data) {
			return data.login
		}
		throw new Error('No user returned')
	} catch (err) {
		if (isApolloError(err as Error)) {
			console.log(err)
			const { message } = err as ApolloError;
			const errorMessage = message === 'Invalid identifier or password' ? 'Datos inválidos' : message;
			throw new Error(errorMessage);
		} else {
			throw err;
		}
	}
}
