import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeAuthenticateUseCase } from "@/useCases/factories/make-authenticate-use-case";
import { InvalidCredentialsError } from "@/useCases/errors/invalid-credentials-error";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.execute({
      email,
      password
    });

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({
        message: error.message
      });
    }

    throw error;
  }
}
