declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test';
		API_URL: string;
		CUSTOM_UID: boolean;
		DESCRIPTON_EN: string;
		DESCRIPTON_DE: string;
	}
}