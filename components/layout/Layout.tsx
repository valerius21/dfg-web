import { Center, Box } from '@chakra-ui/react'
import React, { FC } from 'react'
import Footer from './Footer'

const Layout: FC = ({ children }) => {
	return (
		<Box>
			{/* TODO: Fix Footer */}
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
