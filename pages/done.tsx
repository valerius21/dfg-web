import React from 'react'
import { useTranslation } from 'react-i18next'
import { Heading, Center, Text, Stack, Spacer } from "@chakra-ui/react";
import PrimaryButton from '../components/PrimaryButton'
import { useRecoilValue } from 'recoil';
import { userState } from './annotate';

const Done = () => {
	const { t } = useTranslation()
	const { uid } = useRecoilValue(userState)
	return (
		<Center>
			<Stack spacing={'20'}>
				<Heading
					lineHeight={1.1}
					fontWeight={600}
					fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
					<Text
						as={'span'}
						position={'relative'}
						_after={{
							content: "''",
							width: 'full',
							height: '30%',
							position: 'absolute',
							bottom: 1,
							left: 0,
							bg: 'red.400',
							zIndex: -1,
						}}>
						{t("done")}
					</Text>
					<br />
					<Text as={'span'} >
						{t('thanks')}
					</Text>
				</Heading>
				<Spacer />
				{/* TODO: Translate */}
				<Text fontSize='2xl'>Please copy your user ID <strong>(UID)</strong> below to continue on Limesurvey.</Text>
				<pre>{JSON.stringify(uid, null, 2)}</pre>
				<Spacer />
				<PrimaryButton size='lg'>Continue on Limesurvey</PrimaryButton>
			</Stack>
		</Center>
	)
}

export default Done
