import { FastifyInstance } from 'fastify';

import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { SettingsModel } from '../../generated/prisma/models/Settings';

const prisma = new PrismaClient().$extends(withAccelerate())

export default async function (fastify: FastifyInstance) {
  fastify.post<{ Body: SettingsModel }>('/settings', async function (req) {
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
