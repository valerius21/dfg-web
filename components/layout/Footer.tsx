import {
	Container,
	Stack,
	Text,
	useColorModeValue,
	Button
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';


export default function Footer() {
	const { i18n } = useTranslation()
	return (
		<Stack
			direction='row'
			bg={useColorModeValue('gray.50', 'gray.900')}
			p={4}
			color={useColorModeValue('gray.700', 'gray.200')}>
			<Container
				as={Stack}
				maxW={'6xl'}
				direction={{ base: 'column', md: 'row' }}
				justify={{ base: 'center' }}
				align={{ base: 'center', md: 'center' }}>
				<Text>© {new Date().getFullYear()} Valerius Mattfeld</Text>
			</Container>
			<Button onClick={() => {
				const lang = i18n.language == 'en' ? 'de' : 'en';
				i18n.changeLanguage(lang)
			}}>Sprache / Language</Button>
		</Stack>
	);
}