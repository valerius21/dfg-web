declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production' | 'test';
		API_URL: string;
		IS_ACCUMULATED: boolean;
	}
}