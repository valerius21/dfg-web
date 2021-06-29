import React, { FC, useEffect, useState } from 'react'
import { Progress as CProg } from "@chakra-ui/react"

interface ProgressInterface {
	value: number
}

const Progress: FC<ProgressInterface> = ({ value }) => {
	const [isLoading, updateLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => updateLoading(false), 5000)
	}, [isLoading])

	if (isLoading) return <CProg colorScheme="red" isIndeterminate />

	return (
		<>
			<CProg colorScheme="red" value={value} />
		</>
	)
}

export default Progress
