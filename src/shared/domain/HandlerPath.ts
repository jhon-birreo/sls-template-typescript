export const HandlerPath = (context: string) => {
	console.log(`${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`);

	return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`;
};
