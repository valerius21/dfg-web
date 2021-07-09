import { NextApiRequest, NextApiResponse } from "next";

export const randomImage = () => {
	const TMP_OPTIONS = [
		{
			imageURL: 'https://live.staticflickr.com/4008/4376990620_04506b9d6a.jpg',
			isPrivate: true
		},
		{
			imageURL: 'https://live.staticflickr.com/4010/4376814188_366039075a.jpg',
			isPrivate: false
		}
	]

	return TMP_OPTIONS[Math.floor(Math.random() * TMP_OPTIONS.length)];
}

export default async function image(req: NextApiRequest, res: NextApiResponse) {

}