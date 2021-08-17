import React, { FC, useEffect, useState } from 'react'
import { Progress as CProg } from "@chakra-ui/react"

interface ProgressInterface {
	value: number
	isLoading: boolean
}

const Progress: FC<ProgressInterface> = ({ isLoading, value }) => {
	if (isLoading) return <CProg colorScheme="red" isIndeterminate />
	return (
		<>
			<CProg colorScheme="red" value={value} />
		</>
	)
}

export default Progress
