import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpJsonBosyParser from '@middy/http-json-body-parser';
import { Context, Callback } from 'aws-lambda';
export default (
	handler: ((event: unknown, context: Context, callback: Callback<any>) => void | Promise<any>) | undefined
) => middy(handler).use([httpErrorHandler(), httpEventNormalizer(), httpJsonBosyParser()]);
