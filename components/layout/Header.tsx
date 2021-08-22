import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<Flex justifyContent={'flex-end'}>
			<Button size="sm" m={3} onClick={onOpen}>
				Login with User ID (UID)
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Login</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						bruh
					</ModalBody>

					<ModalFooter>
						<Button mr={3} variant="ghost" size="sm" onClick={onClose}>
							Close
						</Button>
						<Button size="sm">
							Continue
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	)
}

export default Header
