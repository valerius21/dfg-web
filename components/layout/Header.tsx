import { Text, Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, useDisclosure, Code } from '@chakra-ui/react'
import LoginForm from '../LoginForm'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { userState } from 'pages/annotate'

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { t } = useTranslation();
	const { i18n } = useTranslation()
	const { uid } = useRecoilValue(userState)

	return (
		<Flex>
			<Text m={3}>
				User ID: <Code>{uid}</Code>
			</Text>
			<Spacer />
			<Box>
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
			</Box>

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
