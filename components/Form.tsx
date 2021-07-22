import React, { FC, useEffect } from 'react';
import { Box, Button, Stack, Radio } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { Formik, useFormikContext } from 'formik';
import { CheckboxControl, CheckboxContainer, RadioGroupControl } from "formik-chakra-ui";
import * as Yup from 'yup'

const validateSchema = Yup.object({
	sensitivity: Yup.string().required(),
	targetDemographic: Yup.array().min(1),
});
interface FormProps {
	pageNumber: number;
	uid: string;
}

const Form: FC<FormProps> = ({ pageNumber, uid }) => {
	const nextPage = `/${uid}/${pageNumber + 1}`
	const router = useRouter()

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
				targetDemographic: [],
			}}

			onSubmit={(values, { resetForm }) => {
				console.log('values', values)
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
					<RadioGroupControl mt={4} name="sensitivity" label="Classify the picture regarding its sensitivity.">
						<Stack spacing="1">
							<Radio value="1">very private</Radio>
							<Radio value="2">private</Radio>
							<Radio value="3">not private</Radio>
						</Stack>
					</RadioGroupControl>
					<CheckboxContainer mt={4} name="targetDemographic" label="With whom would you be most likely to share this picture?">
						<Stack spacing="1">
							<CheckboxControl name="targetDemographic" value="Friends">Friends</CheckboxControl>
							<CheckboxControl name="targetDemographic" value="Aquantance">Aquantance</CheckboxControl>
							<CheckboxControl name="targetDemographic" value="Collegues">Collegues</CheckboxControl>
							<CheckboxControl name="targetDemographic" value="Family">Family</CheckboxControl>
							<CheckboxControl name="targetDemographic" value="Nobody">Nobody</CheckboxControl>
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
							Submit
						</Button>
						<Button onClick={handleReset}>Reset</Button>
					</Stack>
				</Box>
			)}
		</Formik>
	);
}

export default Form
