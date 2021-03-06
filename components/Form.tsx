import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Button, Stack, Radio, Flex, Spacer, Thead, Table, Th, Tr, Tbody, Td } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { CheckboxControl, CheckboxContainer, RadioGroupControl } from "formik-chakra-ui";
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { attentionCheckState, Check } from 'pages/annotate';
import { logger } from 'utils/logger';
import { fetcher } from 'utils/utils';
import { STUDY_SIZE } from 'db/db';
import _ from 'lodash';

const validateSchema = Yup.object({
	sensitivity: Yup.string().required(),
	targetDemographic: Yup.array().min(1).required(),
});

interface FormProps {
	pageNumber: number;
	uid: string;
	imageID: number | string;
	refetch: any;
	isCheck: boolean;
}


const Form: FC<FormProps> = ({ pageNumber, uid, imageID, refetch, isCheck }) => {
	const router = useRouter()
	const { t } = useTranslation()
	const attentionURL = `/api/dbAttention?uid=${uid}`

	const [shouldRefetch, setShouldRefetch] = useState(true)

	const [attentionCheck, setAttentionCheck] = useRecoilState(attentionCheckState)
	const { checks, currentPage } = attentionCheck
	const currentCheck = checks.find(check => check.page === currentPage) || { isQuestionOne: false }
	const { isQuestionOne } = currentCheck

	useEffect(() => {
		if (pageNumber > STUDY_SIZE)
			// redirect to done after STUDY_SIZE submits
			router.push(`/done?uid=${uid}`)
	}, [pageNumber, router, uid])

	useCallback(() => {
		const fn = async () => {
			if (!shouldRefetch) return

			const { data } = await fetcher(attentionURL)

			if (uid && attentionCheck.uid && data) {
				const { att_0, att_1, att_2 } = data
				const checkOne: Check = {
					...checks[0],
					pass: att_0,
				}
				const checkTwo: Check = {
					...checks[1],
					pass: att_1,
				}
				const checkThree: Check = {
					...checks[2],
					pass: att_2,
				}
				const newChecks = [checkOne, checkTwo, checkThree]
				setAttentionCheck({
					...attentionCheck,
					checks: newChecks,
				})
				setShouldRefetch(false)
			}
		}
		fn()
	}, [attentionCheck, attentionURL, checks, setAttentionCheck, shouldRefetch, uid])

	return (
		<Formik
			initialValues={{
				sensitivity: "",
				targetDemographic: [''],
			}}

			onSubmit={(values, { resetForm }) => {

				const fetchError = (error: any) => {
					logger.error({ error, values })
					alert(error)
					resetForm()
				}

				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				let tms = values.targetDemographic.filter(x => x !== '')

				if (isCheck) {
					const pass = isQuestionOne ? values.sensitivity == '6' : tms.includes("Everybody")

					// update state
					const innerCheck = attentionCheck.checks.find(x => x.imageID === imageID)

					const newCheck: Check = {
						...innerCheck!,
						checked: true,
						pass,
					}

					// find index to update the checks
					const index = attentionCheck.checks.indexOf(innerCheck!)
					let currentChecks = [...attentionCheck.checks] // copy that is not read only
					currentChecks[index] = newCheck
					const updatedChecks = {
						...attentionCheck,
						checks: currentChecks,
						currentPage: pageNumber - 1,
					}
					setAttentionCheck(updatedChecks)

					const attentionPayload = updatedChecks
					const rawAttention = JSON.stringify({ ...attentionPayload, page: pageNumber - 1 })
					const attentionRequestOptions: RequestInit = {
						method: 'POST',
						headers: myHeaders,
						body: rawAttention,
						redirect: 'follow',

					}

					fetch(`/api/attention`, attentionRequestOptions)
						.then(response => {
							if (response.status === 400) {
								throw new Error('Attention Check Request Format Error');
							}
							response.text()
						})
						.then(() => {
							resetForm()
							refetch()
						})
						.catch(fetchError);
					setShouldRefetch(true)
					return
				}

				let tdv = {
					acquaintance: tms.includes("Aquaintance"),
					colleagues: tms.includes("Colleagues"),
					family: tms.includes("Family"),
					friends: tms.includes("Friends"),
					everybody: tms.includes("Everybody"),
					nobody: tms.includes("Nobody"),
				}

				let payload = {
					sensitivity: values.sensitivity,
					id: imageID,
					uid: uid,
					...tdv
				}

				const raw = JSON.stringify(payload)

				const requestOptions: RequestInit = {
					method: 'POST',
					headers: myHeaders,
					body: raw,
					redirect: 'follow',
				};

				fetch(`/api/submit`, requestOptions)
					.then(response => {
						if (response.status === 400) {
							throw new Error(t('verficationError'));
						}
						response.text()
					})
					.then(() => {
						setAttentionCheck({
							...attentionCheck,
							currentPage: pageNumber - 1,
						})
						resetForm()
						refetch()
					})
					.catch(fetchError);
				setShouldRefetch(true)
			}}
			validationSchema={validateSchema}
		>
			{({ handleSubmit, handleReset, isSubmitting, values }) => (
				<Box
					as="form"
					px={5}
					onSubmit={handleSubmit as any}
				>
					<RadioGroupControl
						mt={4}
						name="sensitivity"
						label={
							isQuestionOne && isCheck ? t('checkOne') : t('questionOne')
						}>
						<Table variant='simple'>
							<Thead>
								<Tr>
									{_.range(1, 6).map((val, index) => (
										<Th key={index}>{t(`a1${val}`)}</Th>
									))}
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									{_.range(1, 6).map((val, index) => (
										<Td key={index}>
											<Radio value={`${val}`} />
										</Td>
									))}
								</Tr>
							</Tbody>
						</Table>
					</RadioGroupControl>
					<CheckboxContainer mt={4} name="targetDemographic" label={
						!isQuestionOne && isCheck ? t('checkTwo') : t('questionTwo')
					}>
						<Stack spacing="1">
							<CheckboxControl name="targetDemographic" value="Nobody">{t('a25')}</CheckboxControl>
							<hr />
							<CheckboxControl isDisabled={values.targetDemographic.indexOf('Nobody') !== -1} name="targetDemographic" value="Family">{t('a22')}</CheckboxControl>
							<CheckboxControl isDisabled={values.targetDemographic.indexOf('Nobody') !== -1} name="targetDemographic" value="Friends">{t('a21')}</CheckboxControl>
							<CheckboxControl isDisabled={values.targetDemographic.indexOf('Nobody') !== -1} name="targetDemographic" value="Aquaintance">{t('a24')}</CheckboxControl>
							<CheckboxControl isDisabled={values.targetDemographic.indexOf('Nobody') !== -1} name="targetDemographic" value="Colleagues">{t('a23')}</CheckboxControl>
							<hr />
							<CheckboxControl isDisabled={values.targetDemographic.indexOf('Nobody') !== -1} name="targetDemographic" value="Everybody">{t('a26')}</CheckboxControl>
						</Stack>
					</CheckboxContainer>
					<Flex my={8} >
						<Box>
							<Button
								size="md"
								rounded="full"
								color="white"
								bg="red.400"
								_hover={{ bg: 'red.300' }}
								type="submit"
								isLoading={isSubmitting}
							>
								{t('submit')}
							</Button>
						</Box>
						<Spacer />
						<Box>
							<Button mr='0' onClick={() => {
								handleReset()
								refetch()
							}}>
								Reset
							</Button>
						</Box>
					</Flex>
				</Box>
			)}
		</Formik>
	);
}

export default Form
