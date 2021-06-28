import { Center, Box } from '@chakra-ui/react'
import React, { FC } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Layout: FC = ({ children }) => {
	return (
		<Box>
			<Navbar />
			<Center pb="sm">
				<Box h="5xl" w="90%">
					{children}
				</Box>
			</Center>
			<Footer />
		</Box>
	)
}

export default Layout
