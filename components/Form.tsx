import React, { FC, useCallback, useEffect, useState } from 'react';
import { Box, Button, Stack, Radio } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { CheckboxControl, CheckboxContainer, RadioGroupControl } from "formik-chakra-ui";
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { attentionCheckState, Check } from 'pages/annotate';
import { logger } from 'utils/logger';
import useSWR from 'swr';
import { fetcher } from 'utils/utils';

const validateSchema = Yup.object({
	sensitivity: Yup.string().required(),
	targetDemographic: Yup.array().min(1),
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

	// const { data, error, mutate } = useSWR(attentionURL, fetcher, {
	// 	revalidateOnFocus: false,
	// })

	fetcher(attentionURL).then(res => {
		logger.info(res)
	}).catch(err => { logger.error(err) })

	const [shouldRefetch, setShouldRefetch] = useState(true)

	const [attentionCheck, setAttentionCheck] = useRecoilState(attentionCheckState)
	const { checks, currentPage } = attentionCheck
	const currentCheck = checks.find(check => check.page === currentPage) || { isQuestionOne: false }
	const { isQuestionOne } = currentCheck

	useEffect(() => {
		if (pageNumber > 100)
			// redirect to done after 100 submits
			router.push('/done')
	}, [pageNumber, router])

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

	// if (error) {
	// 	logger.error(error)
	// 	return (<>Error on User fetching.</>)
	// }


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
					const currentCheck = attentionCheck.checks.find(x => x.imageID === imageID)

					const newCheck: Check = {
						...currentCheck!,
						checked: true,
						pass,
					}

					// find index to update the checks
					const index = attentionCheck.checks.indexOf(currentCheck!)
					let checks = [...attentionCheck.checks] // copy that is not read only
					checks[index] = newCheck
					const updatedChecks = {
						...attentionCheck,
						checks,
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
							// mutate(attentionURL)
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
						// mutate(attentionURL)
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
						<Stack spacing="1">

							<Radio value="1">{t('a11')}</Radio>
							<Radio value="2">{t('a13')}</Radio>
							<Radio value="3">{t('a12')}</Radio>
							<Radio value="4">{t('a14')}</Radio>
							<Radio value="5">{t('a15')}</Radio>
							<Radio value="6">{t('a16')}</Radio>
						</Stack>
					</RadioGroupControl>
					<CheckboxContainer mt={4} name="targetDemographic" label={
						!isQuestionOne && isCheck ? t('checkTwo') : t('questionTwo')
					}>
						<Stack spacing="1">
							<CheckboxControl isDisabled={values.targetDemographic.indexOf('Nobody') !== -1} name="targetDemographic" value="Friends">{t('a21')}</CheckboxControl>
							<CheckboxControl isDisabled={values.targetDemographic.indexOf('Nobody') !== -1} name="targetDemographic" value="Aquaintance">{t('a24')}</CheckboxControl>
							<CheckboxControl isDisabled={values.targetDemographic.indexOf('Nobody') !== -1} name="targetDemographic" value="Colleagues">{t('a23')}</CheckboxControl>
							<CheckboxControl isDisabled={values.targetDemographic.indexOf('Nobody') !== -1} name="targetDemographic" value="Family">{t('a22')}</CheckboxControl>
							<hr />
							<CheckboxControl isDisabled={values.targetDemographic.indexOf('Nobody') !== -1} name="targetDemographic" value="Everybody">{t('a26')}</CheckboxControl>
							<hr />
							<CheckboxControl name="targetDemographic" value="Nobody">{t('a25')}</CheckboxControl>
						</Stack>
					</CheckboxContainer>
					<Stack my={5} spacing={20} direction="row">
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
						<Button onClick={() => {
							handleReset()
							refetch()
						}}>Reset</Button>
					</Stack>
				</Box>
			)}
		</Formik>
	);
}

export default Form
