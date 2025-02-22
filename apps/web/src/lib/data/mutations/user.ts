import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
	mutation Register($input: UsersPermissionsRegisterInput!) {
		register(input: $input) {
			jwt
			user {
				username
				email
				name
				lastName
			}
		}
	}
`;

export const LOGIN = gql`
	mutation Login($input: UsersPermissionsLoginInput!) {
		login(input: $input) {
			jwt
			user {
				username
				email
				name
				lastName
			}
		}
	}
`;
