import { Core } from '@strapi/strapi'

export const extendUser = ({ strapi }: { strapi: Core.Strapi }) => ({
	typeDefs: `
		input UserDetailsInput {
			name: String!
			lastName: String!
			birthday: Date
		}
		extend input UsersPermissionsRegisterInput {
			name: String!
			lastName: String!
		}
		extend type UsersPermissionsMe {
			name: String
			lastName: String
			birthday: Date
			wholeName: String
		}
		type Mutation {
			updateMe(userDetails: UserDetailsInput!): UsersPermissionsMe
		}
	`,
	resolvers: {
		UsersPermissionsMe: {
			name: ({ name }) => name,
			lastName: ({ lastName }) => lastName,
			wholeName: ({ name, lastName }) => `${name} ${lastName}`,
			birthday: ({ birthday }) => birthday
		},
		Mutation: {
			updateMe: async (_, { userDetails }, { state: { user: { documentId } } }) => {
				return await strapi.documents('plugin::users-permissions.user').update({
					documentId,
					data: userDetails
				})
			}
		}
	}
})
