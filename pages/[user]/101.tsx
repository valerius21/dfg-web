import React from 'react'
import { useTranslation } from 'react-i18next'
import { Heading, Center, Text } from "@chakra-ui/react";

const Done = () => {
	const { t } = useTranslation()
	return (
		<Center>

			<Heading
				lineHeight={1.1}
				fontWeight={600}
				fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
				<Text
					as={'span'}
					position={'relative'}
					_after={{
						content: "''",
						width: 'full',
						height: '30%',
						position: 'absolute',
						bottom: 1,
						left: 0,
						bg: 'red.400',
						zIndex: -1,
					}}>
					{t("done")}
				</Text>
				<br />
				<Text as={'span'} >
					{t('thanks')}
				</Text>
			</Heading>
		</Center>
	)
}

export default Done
