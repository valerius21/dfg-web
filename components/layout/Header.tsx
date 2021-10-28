import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { PrimaryButton } from '../PrimaryButton'
import LoginForm from '../LoginForm'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { t } = useTranslation();
	const { i18n } = useTranslation()

	return (
		<Flex justifyContent={'flex-end'}>
			<Button
				size='sm'
				m={3}
				onClick={() => {
					const lang = i18n.language == 'en' ? 'de' : 'en';
					i18n.changeLanguage(lang)
				}}>Sprache / Language</Button>

			<Button size="sm" m={3} onClick={onOpen}>
				{t("loginTitle")}
			</Button>


			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('loginTitle')}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<LoginForm onClose={onClose} />
					</ModalBody>
					<ModalFooter />
				</ModalContent>
			</Modal>
		</Flex>
	)
}

export default Header
