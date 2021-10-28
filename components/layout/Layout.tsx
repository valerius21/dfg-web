import { Center, Box } from '@chakra-ui/react'
import { config } from 'config'
import React, { FC } from 'react'
import Header from './Header'

const Layout: FC = ({ children }) => {
	return (
		<Box>
			{
				/* Display Login, if UID are customized */
				config.CUSTOM_UID &&
				<Header />
			}
			<Center pb="sm" mt="10">
				<Box h="5xl" w="90%">
					{children}
				</Box>
			</Center>
		</Box>
	)
}

export default Layout
