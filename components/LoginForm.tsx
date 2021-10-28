import React, { FC, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/layout'
import PrimaryButton from '../components/PrimaryButton'
import Link from 'next/link'
import { Stack, Input, NumberInput, NumberInputField } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface Props {
	onClose: any
}


const LoginForm: FC<Props> = ({ onClose }) => {
	const [uid, setUID] = useState<string>('')
	const router = useRouter()

	const handleClick = () => {
		router.push({
			pathname: '/annotate',
			query: {
				id: uid
			}
		})
		onClose()
	}


	return (
		<Box
			px={5}
		>
			<Stack my={5} spacing={5} >
				<Input placeholder="UID" name="uid" onChange={(e) => setUID(e.target.value)} />
			</Stack>
			<PrimaryButton
				size='sm'
				isDisabled={!uid}
				onClick={handleClick}
			>
				Login
			</PrimaryButton>
		</Box>
	)
}

export default LoginForm
