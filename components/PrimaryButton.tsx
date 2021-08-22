import React, { FC } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

const PrimaryButton: FC<ButtonProps> = ({ ...props }) => {
	return (
		<Button
			rounded={'full'}
			size={'lg'}
			fontWeight={'normal'}
			px={6}
			colorScheme={'red'}
			bg={'red.400'}
			color="white"
			_hover={{ bg: 'red.300' }}
			{...props}
		/>
	)
}

export {
	PrimaryButton
}

export default PrimaryButton