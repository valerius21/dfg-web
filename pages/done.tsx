import React from 'react'
import { useTranslation } from 'react-i18next'
import { Heading, Center, Text, Stack, Spacer, useClipboard, Input, Flex, Button, Link } from "@chakra-ui/react";
import PrimaryButton from '../components/PrimaryButton'
import { useRecoilValue } from 'recoil';
import { userState } from './annotate';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { logger } from 'utils/logger';

export const getServerSideProps: GetServerSideProps = async (context) => {
	logger.info('getServerSideProps', context);
	return {
		props: {
			uid: context.query.uid as string,
		}
	}
}

const Done = ({
	uid
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const { t } = useTranslation()
	const { uid: stateUid } = useRecoilValue(userState)
	const { hasCopied, onCopy } = useClipboard(uid)
	const userId = stateUid || uid

	return (
		<Center>
			<Stack spacing={'14'}>
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
				<Text fontSize='2xl'>{t('copyId')}</Text>
				<Flex>
					<Input id="doneInput" value={userId} isReadOnly placeholder="No UID found. Please check your URL!" />
					<Button onClick={onCopy} isDisabled={hasCopied} ml={2}>{hasCopied ? 'Copied' : 'Copy'}</Button>
				</Flex>
				<Spacer />
				<Link href={`https://survey.academiccloud.de/index.php/532222?lang=de&uid=${userId}`} >
					<Center>
						<PrimaryButton>{t('continueLimesurvey')}</PrimaryButton>
					</Center>
				</Link>
			</Stack>
		</Center>
	)
}

export default Done
