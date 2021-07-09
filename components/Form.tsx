import React, { FC, useEffect } from 'react';
import { useForm, Controller, FieldValues, Control } from 'react-hook-form';
import { Button, Text, Switch, FormLabel, Checkbox, FormControl, Select, Box } from "@chakra-ui/react";
import { useRouter } from 'next/router';


interface FormProps {
	pageNumber: number;
	uid: string;
}

const Form: FC<FormProps> = ({ pageNumber, uid }) => {
	const nextPage = `/${uid}/${pageNumber + 1}`
	const router = useRouter()

	const defaultValues = {
		Aquantance: false,
		Collegues: false,
		Family: true,
		Friends: false,
		Nobody: false,
		sensitiviyLevel: "private",
	}



	const {
		register, control, handleSubmit, reset,
		formState: { errors, isSubmitting, isSubmitSuccessful }
	} = useForm({
		defaultValues
	})

	useEffect(() => {
		const { number } = router.query
		let pageNumber = parseInt(number as string)
		console.log(pageNumber)
		if (pageNumber > 100) {
			console.log('bruh');

			router.push('/done')
			return
		}
		router.prefetch(nextPage);
	}, [nextPage, router])

	useEffect(() => {
		if (isSubmitSuccessful) {
			console.log('resetting');

			reset({
				Aquantance: false,
				Collegues: false,
				Family: true,
				Friends: false,
				Nobody: false,
				sensitiviyLevel: "private",
			})

			router.push(nextPage)
		}

	}, [reset, isSubmitSuccessful, defaultValues, router, nextPage])


	const onSubmit = (data: any) => {
		console.log(data)
		console.log(errors);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl id="evaluation">
				<Box m={4}>
					<FormLabel mt={4}>
						Classify the picture regarding its sensitivity.
					</FormLabel>
					<Controller
						name="sensitiviyLevel"
						control={control}
						defaultValue=""
						render={
							({ field }) => (
								<Select placeholder="Select sensitivity" {...field}>
									<option value="very_private">very private</option>,
									<option value="private">private</option>,
									<option value="not_private">not private</option>,
									<option value="not_possible">not possible</option>,
								</Select>
							)}
					/>
					<FormLabel mt={4}>
						With whom would you be most likely to share this picture?
					</FormLabel>
					<Checkbox   {...register('Friends')} >
						Friends
					</Checkbox>
					<br />
					<Checkbox   {...register('Aquantance')} >
						Aquantance
					</Checkbox>
					<br />
					<Checkbox   {...register("Collegues", {})} >
						Collegues
					</Checkbox>
					<br />
					<Checkbox   {...register("Family", {})} >
						Family
					</Checkbox>
					<br />
					<Checkbox   {...register("Nobody", {})} >
						Nobody
					</Checkbox>
					<br />
				</Box>
				<Button
					m={4}
					size="md"
					rounded="full"
					color="white"
					bg="red.400"
					_hover={{ bg: 'red.300' }}
					isLoading={isSubmitting}
					type="submit"
				>
					Submit
				</Button>
				<Button onClick={() => reset(defaultValues)}>Reset</Button>
			</FormControl>
		</form>
	);
}

export default Form
