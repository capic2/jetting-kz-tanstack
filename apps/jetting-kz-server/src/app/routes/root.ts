import { FastifyInstance } from 'fastify';
import { prisma } from '../../utils/db';
import { Prisma } from '../../generated/prisma';

export default async function (fastify: FastifyInstance) {
  fastify.register(require('@fastify/leveldb'), { name: 'db' });

  fastify.post<{ Body: Prisma.SettingsCreateInput }>(
    '/settings',
    async function (req) {
      return prisma.settings.upsert({
        where: {
          engineType: req.body.engineType,
          airbox: req.body.airbox,
          emulsionTubeType: req.body.emulsionTubeType,
          floatHeight: req.body.floatHeight,
          floatType: req.body.floatType,
          oilMix: req.body.oilMix,
          semiStepNeedle: req.body.semiStepNeedle,
          sparkleType: req.body.sparkleType,
          trackType: req.body.trackType,
        },
        create: {
          engineType: req.body.engineType,
          airbox: req.body.airbox,
          emulsionTubeType: req.body.emulsionTubeType,
          floatHeight: req.body.floatHeight,
          floatType: req.body.floatType,
          oilMix: req.body.oilMix,
          semiStepNeedle: req.body.semiStepNeedle,
          sparkleType: req.body.sparkleType,
          trackType: req.body.trackType,
          fuelType: req.body.fuelType,
        },
        update: {
          engineType: req.body.engineType,
          airbox: req.body.airbox,
          emulsionTubeType: req.body.emulsionTubeType,
          floatHeight: req.body.floatHeight,
          floatType: req.body.floatType,
          oilMix: req.body.oilMix,
          semiStepNeedle: req.body.semiStepNeedle,
          sparkleType: req.body.sparkleType,
          trackType: req.body.trackType,
          fuelType: req.body.fuelType,
        },
      });
    }
  );
  fastify.get('/settings', async function (req, reply) {
    return { message: 'Hello API' };
  });
}
