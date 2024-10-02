import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

export const getPulpSchema = z.object({
	id: z.string().length(5),
});

export const getPulpValidator = zValidator('param', getPulpSchema);

export const createPulpSchema = z.object({
	title: z.string().max(25).optional(),
	content: z.string(),
	language: z.string().optional(),
});

export const createPulpValidator = zValidator('json', createPulpSchema);

export const updatePulpSchema = z.object({
	id: z.string().length(5),
	accessKey: z.string().uuid(),
	title: z.string().max(25).optional(),
	content: z.string().optional(),
	language: z.string().optional(),
});

export const updatePulpValidator = zValidator('json', updatePulpSchema);

export const deletePulpSchema = z.object({
	id: z.string().length(5),
	accessKey: z.string().uuid(),
});

export const deletePulpValidator = zValidator('json', deletePulpSchema);
