import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

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

    const { user } = await authenticateUseCase.execute({
      email,
      password
    });

    const token = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id
        }
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        role: user.role
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d"
        }
      }
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true, // Encrypt using HTTPs, front-end can`t read as a string
        sameSite: true,
        httpOnly: true // Only access on backend requests and responses, Don`t save on browser
      })
      .status(200)
      .send({
        token
      });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({
        message: error.message
      });
    }

    throw error;
  }
}
