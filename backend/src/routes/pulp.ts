import { Hono } from 'hono';
import database from '../database';
import { and, eq } from 'drizzle-orm';
import { pulps } from '../database/schema';
import { getPulpValidator, createPulpValidator, updatePulpValidator, deletePulpValidator } from '../validators';

const app = new Hono<{ Bindings: Env }>();

app.get('/', (c) => c.json({ msg: 'server up and running' }));

app.get('/:id', getPulpValidator, async (c) => {
	const db = database(c.env.DB);
	const { id } = c.req.valid('param');

	try {
		const pulp = await db.query.pulps.findFirst({
			where: eq(pulps.id, id),
			columns: {
				id: true,
				title: true,
				content: true,
				language: true,
				views: true,
				createdAt: true,
			},
		});

		if (!pulp) return c.json({ msg: 'pulp not found' }, 404);

		await db
			.update(pulps)
			.set({ views: pulp.views + 1 })
			.where(eq(pulps.id, id));

		return c.json({ ...pulp, views: pulp.views + 1 });
	} catch (error) {
		return c.json({ msg: "couldn't fetch pulp" }, 500);
	}
});

app.post('/', createPulpValidator, async (c) => {
	const db = database(c.env.DB);
	const data = c.req.valid('json');

	try {
		const [pulp] = await db.insert(pulps).values(data).returning({ id: pulps.id, accessKey: pulps.accessKey });

		return c.json({ ...pulp, msg: 'pulp created' });
	} catch (error) {
		return c.json({ msg: "couldn't create pulp" }, 500);
	}
});

app.patch('/', updatePulpValidator, async (c) => {
	const db = database(c.env.DB);
	const { id, accessKey, ...data } = c.req.valid('json');

	try {
		const { meta } = await db
			.update(pulps)
			.set(data)
			.where(and(eq(pulps.id, id), eq(pulps.accessKey, accessKey)));

		if (!meta.changed_db) return c.json({ msg: "couldn't update pulp" }, 422);

		return c.json({ msg: 'pulp updated' });
	} catch (error) {
		console.log(error);
		return c.json({ msg: "couldn't update pulp" }, 500);
	}
});

app.delete('/', deletePulpValidator, async (c) => {
	const db = database(c.env.DB);
	const { id, accessKey } = c.req.valid('json');

	try {
		const { meta } = await db.delete(pulps).where(and(eq(pulps.id, id), eq(pulps.accessKey, accessKey)));

		if (!meta.changed_db) return c.json({ msg: "couldn't delete pulp" }, 422);

		return c.json({ id, msg: 'pulp deleted' });
	} catch (error) {
		console.log(error);
		return c.json({ msg: "couldn't delete pulp" }, 500);
	}
});

export default app;
