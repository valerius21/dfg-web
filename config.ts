const API_URL =
	process.env.API_URL ||
	'http://localhost:8000';

const DESCRIPTION_DE =
	process.env.DESCRIPTION_DE ||
	'Eine Studie.'

const DESCRIPTION_EN =
	process.env.DESCRIPTION_DE ||
	'A study.'


const CUSTOM_UID =
	process.env.CUSTOM_UID ||
	false;

export {
	API_URL,
	DESCRIPTION_DE,
	DESCRIPTION_EN,
	CUSTOM_UID,
}
