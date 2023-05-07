import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeFetchNearbyGymsUseCase } from "@/useCases/factories/make-fetch-nearby-gyms-use-case";

export async function fetchNearby(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fetchNearbyGymsQueryParamsSchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    })
  });

  const { latitude, longitude } = fetchNearbyGymsQueryParamsSchema.parse(
    request.query
  );

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude
  });

  return reply.status(200).send({
    gyms
  });
}
