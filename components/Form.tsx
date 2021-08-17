import React, { FC, useEffect } from 'react';
import { Box, Button, Stack, Radio } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { Formik, useFormikContext } from 'formik';
import { CheckboxControl, CheckboxContainer, RadioGroupControl } from "formik-chakra-ui";
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const validateSchema = Yup.object({
	sensitivity: Yup.string().required(),
	targetDemographic: Yup.array().min(1),
});
interface FormProps {
	pageNumber: number;
	uid: string;
	imageID: number;
	isPrivate: boolean;
}

const Form: FC<FormProps> = ({ pageNumber, uid, imageID, isPrivate }) => {
	const nextPage = `/${uid}/${pageNumber + 1}`
	const router = useRouter()
	const { t } = useTranslation()

	// prefetching the next page
	useEffect(() => {
		const { number } = router.query
		let pNo = parseInt(number as string)
		if (pNo > 100) {
			// redirect to done after 100 submits
			router.push('/done')
			return
		}
		router.prefetch(nextPage);
	}, [nextPage, router])

	return (
		<Formik
			initialValues={{
				sensitivity: "",
				targetDemographic: [''],
			}}

			onSubmit={(values, { resetForm }) => {
				const payload = {
					sensitivity: values.sensitivity,
					is_private: isPrivate,
					photo_id: imageID,
					uid: uid,
					acquaintance: values.targetDemographic.indexOf("Acquaintance") !== -1,
					colleagues: values.targetDemographic.indexOf("Colleagues") !== -1,
					family: values.targetDemographic.indexOf("Family") !== -1,
					friends: values.targetDemographic.indexOf("Friends") !== -1,
					everybody: values.targetDemographic.indexOf("Everybody") !== -1,
					nobody: values.targetDemographic.indexOf("Nobody") !== -1,
				}

				console.log(JSON.stringify(payload));
				axios.post('http://127.0.0.1:8000/submit', payload)
				resetForm()
				router.push(nextPage)
			}}
			validationSchema={validateSchema}
		>
			{({ handleSubmit, handleReset, isSubmitting }) => (
				<Box
					as="form"
					px={5}
					onSubmit={handleSubmit as any}
				>
					<RadioGroupControl mt={4} name="sensitivity" label={t('questionOne')}>
						<Stack spacing="1">
							<Radio value="1">{t('a11')}</Radio>
							<Radio value="2">{t('a12')}</Radio>
							<Radio value="3">{t('a13')}</Radio>
						</Stack>
					</RadioGroupControl>
					<CheckboxContainer mt={4} name="targetDemographic" label={t('questionTwo')}>
						<Stack spacing="1">
							<CheckboxControl name="targetDemographic" value="Friends">{t('a21')}</CheckboxControl>
							<CheckboxControl name="targetDemographic" value="Aquaintance">{t('a24')}</CheckboxControl>
							<CheckboxControl name="targetDemographic" value="Colleagues">{t('a23')}</CheckboxControl>
							<CheckboxControl name="targetDemographic" value="Family">{t('a22')}</CheckboxControl>
							<hr />
							<CheckboxControl name="targetDemographic" value="Everybody">{t('a26')}</CheckboxControl>
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
						<Button onClick={handleReset}>Reset</Button>
					</Stack>
				</Box>
			)}
		</Formik>
	);
}

export default Form
