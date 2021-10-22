import { gql } from "@apollo/client/core"
import { Client } from "./db";


const query = gql`
	query GetPkFromSet($key: uuid!) {
		public(where: {id: {_eq: $key}}) {
			id
		}
		private(where: {id: {_eq: $key}}) {
			id
		}
	}
`

export const exp_is_uuid_private = async (uuid: string): Promise<boolean> => {
	const { data } = await Client.query({
		query: query,
		variables: {
			key: uuid
		}
	})

	return data.public.length == 0
}