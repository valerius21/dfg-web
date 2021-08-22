import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { PrimaryButton } from '../PrimaryButton'
import LoginForm from '../LoginForm'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { t } = useTranslation();

	return (
		<Flex justifyContent={'flex-end'}>
			<Button size="sm" m={3} onClick={onOpen}>
				{t("loginTitle")}
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('loginTitle')}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<LoginForm />
					</ModalBody>

					<ModalFooter>
						<Button mr={3} variant="ghost" size="sm" onClick={onClose}>
							{t('close')}
						</Button>
						<PrimaryButton size="sm" >
							{t('submit')}
						</PrimaryButton>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	)
}

export default Header
