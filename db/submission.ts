import _ from "lodash"

export interface Submission {
	id: string;

	sensitivity: number | string;
	uid: string
	acquaintance: boolean
	colleagues: boolean
	family: boolean
	friends: boolean
	everybody: boolean
	nobody: boolean
}

export const checkSubmission = ({ acquaintance, colleagues, family, friends, everybody, nobody }: Submission): boolean => {
	const demographics = [acquaintance, colleagues, family, friends, everybody, nobody]

	// check if all demographics are not undefined
	if (!_.every(demographics, (d) => d !== undefined)) {
		return false
	}

	// check if all demographics are true
	let bools = demographics.reduce((acc, curr) => acc && curr)

	if (bools) {
		return false
	}

	// check if any demographics are false
	bools = demographics.reduce((acc, curr) => acc || curr)
	if (!bools) {
		return false
	}

	if (nobody && everybody) {
		return false
	}

	// check if nobody and somebody are selected
	if (nobody && _.take(demographics, 4).reduce((acc, curr) => acc || curr)) {
		return false
	}

	return true
}