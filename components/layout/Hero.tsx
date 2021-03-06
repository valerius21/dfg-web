import {
	Container,
	Stack,
	Flex,
	Box,
	Heading,
	Text,
	Center,
	Icon,
	IconProps,
	Spinner,
	Image
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link'
import { FC } from 'react';
import { PrimaryButton } from '../PrimaryButton'
import { useQuery } from 'react-query';
import { createUserWithImages } from 'utils/utils';

const Loading = () => {
	const { t } = useTranslation();
	return (<>
		<Center>
			<Stack spacing={3}>
				<Center>
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="red.400"
						size="xl"
					/>
				</Center>
				<Text fontSize="4xl" textAlign={'center'}>{t('gettingReady')}</Text>
				<Text fontSize="xs" textAlign={'center'}>{t('thisCanTakeSomeTime')}</Text>
			</Stack>
		</Center>

	</>)
}


const Hero: FC = () => {
	const { t } = useTranslation()
	const { isLoading, isError, data } = useQuery('createUser', createUserWithImages)
	return (isLoading ? <Loading /> : isError ? <div>Database Error</div> :
		<Container maxW={'7xl'}>
			<Stack
				align={'center'}
				spacing={{ base: 8, md: 10 }}
				py={{ base: 20, md: 28 }}
				direction={{ base: 'column', md: 'row' }}>
				<Stack flex={1} spacing={{ base: 5, md: 10 }}>
					<Heading
						lineHeight={1.1}
						fontWeight={600}
						fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
						<Text
							as={'span'}
							position={'relative'}
							_after={{
								content: "''",
								height: '30%',
								width: 'full',
								position: 'absolute',
								bottom: 1,
								left: 0,
								bg: 'red.400',
								zIndex: -1,
							}}>
							DFG
						</Text>
						<br />
						<Text as={'span'} color={'red.400'}>
							{t('title')}
						</Text>
					</Heading>
					<Stack>
						{[1, 2, 3, 4, 5, 6].map((item, index) => (
							<Text key={index} color={'gray.800'}>
								{t(`description${item}`)}
							</Text>
						))}
					</Stack>
					<Stack
						spacing={{ base: 4, sm: 6 }}
						direction={{ base: 'column', sm: 'row' }}>
						{!data && isLoading &&
							<PrimaryButton isLoading={true}>
								{t('start')}
							</PrimaryButton>
						}
						{
							data && !isLoading && !isError &&
							<Link href={{
								pathname: `/annotate`,
								query: {
									id: data.insert_users_one.id,
								}
							}} passHref>
								<PrimaryButton>
									{t('start')}
								</PrimaryButton>
							</Link>
						}
					</Stack>
				</Stack>
				<Flex
					flex={1}
					justify={'center'}
					align={'center'}
					position={'relative'}
					w={'full'}>
					<Blob
						w={'150%'}
						h={'150%'}
						position={'absolute'}
						top={'-20%'}
						left={0}
						zIndex={-1}
						color={'red.50'}
					/>
					<Box
						position={'relative'}
						height={'512px'}
						rounded={'2xl'}
						boxShadow={'2xl'}
						width={'342px'}
						overflow={'hidden'}>
						<Image
							alt={'Hero Image'}
							fit={'cover'}
							align={'center'}
							width={'342px'}
							height={'512px'}
							src='/images/logo.png'
						/>
					</Box>
				</Flex>
			</Stack>
		</Container>
	);
}



export const Blob = (props: IconProps) => {
	return (
		<Icon
			width={'100%'}
			viewBox="0 0 578 440"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
				fill="currentColor"
			/>
		</Icon>
	);
};

export default Hero