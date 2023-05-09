import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Check In (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create a check in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        description: "Some description.",
        phone: "(99) 99999-9999",
        latitude: -22.4173682,
        longitude: -45.4869312
      }
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -22.4173682,
        longitude: -45.4869312
      });

    expect(response.statusCode).toEqual(201);
  });
});
