const API_URL =
	process.env.NEXT_PUBLIC_API_URL ||
	'http://localhost:8000';

const DESCRIPTION_DE =
	process.env.NEXT_PUBLIC_DESCRIPTION_DE ||
	'Eine Studie.'

const DESCRIPTION_EN =
	process.env.NEXT_PUBLIC_DESCRIPTION_EN ||
	'A study.'


const CUSTOM_UID =
	process.env.NEXT_PUBLIC_CUSTOM_UID === "true"

const ACCUMULATE_API_URL =
	process.env.NEXT_PUBLIC_ACCUMULATE_API_URL === "true"

const config = {
	API_URL,
	DESCRIPTION_DE,
	DESCRIPTION_EN,
	CUSTOM_UID,
	ACCUMULATE_API_URL
}

export {
	config
}