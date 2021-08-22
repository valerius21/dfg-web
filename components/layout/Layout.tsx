import { Center, Box } from '@chakra-ui/react'
import React, { FC } from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout: FC = ({ children }) => {
	return (
		<Box>
			{/* TODO: Fix Footer */}
			<Header />
			<Center pb="sm" mt="10">
				<Box h="5xl" w="90%">
					{children}
				</Box>
			</Center>
			<Footer />
		</Box>
	)
}

export default Layout
