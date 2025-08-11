import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  fastify.register(
    require('@fastify/leveldb'),
    { name: 'db' }
  )

  fastify.post('/settings', async function () {
    return { message: 'Hello API' };
  });
  fastify.get('/settings', async function (req, reply) {
    const val = await this.level.db.get(req.query.key)
    return { message: 'Hello API' };
  })
}
