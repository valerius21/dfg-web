import React, { FC, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/layout'
import { PrimaryButton } from '../components/PrimaryButton'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Stack, Input, NumberInput, NumberInputField } from '@chakra-ui/react'

interface Props {
	onClose: any
}

const LoginForm: FC<Props> = ({ onClose }) => {
	const [targetURL, setTargetURL] = useState<string>('')
	const [uid, setUID] = useState<string>('')
	const [page, setPage] = useState<string>('')

	useEffect(() => {
		setTargetURL(`${window.location.origin}/${uid}/${page}`)
	}, [uid, page])

	return (
		<Box
			px={5}
		>
			<Stack my={5} spacing={5} >
				<Input placeholder="UID" name="uid" onChange={(e) => setUID(e.target.value)} />
				<NumberInput>
					<NumberInputField onChange={(e) => setPage(e.target.value)} placeholder="Next submission ID" name="nextSubmissionID" />
				</NumberInput>
			</Stack>
			<Link
				href={targetURL!}
				passHref
			>
				<PrimaryButton
					size='sm'
					isDisabled={!uid || !page}
					onClick={onClose}
				>
					Login
				</PrimaryButton>
			</Link>
		</Box>
	)
}

export default LoginForm
