import {
	Box,
	Flex,
	Text,
	Button,
	Stack,
	Collapse,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export default function WithSubnavigation() {
	const { isOpen } = useDisclosure();
	const { t } = useTranslation()

	return (
		<Box >
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}>

				<Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
					<Text
						textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
						fontFamily={'heading'}
						color={useColorModeValue('gray.800', 'white')}>
						CHANGE LANG
					</Text>

					<Flex
						display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				<Stack
					flex={{ base: 1, md: 0 }}
					justify={'flex-end'}
					direction={'row'}
					spacing={6}>
					<Button
						display={{ md: 'inline-flex' }}
						fontSize={'sm'}
						fontWeight={600}
						color={'white'}
						bg={'red.400'}
						href={'#'}
						_hover={{
							bg: 'red.300',
						}}>
						{t('start')}
					</Button>
				</Stack>
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav />
			</Collapse>
		</Box>
	);
}

const DesktopNav = () => {
	return (
		<Stack direction={'row'} spacing={4}>
			CHANGE LANGUAGE
		</Stack>
	);
};

const MobileNav = () => {
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			p={4}
			display={{ md: 'none' }}>
		</Stack>
	);
};
