import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DataInteractionService {
  static async createUser(email: string, tokenLength: number) {
    return await prisma.user.create({
      data: {
        email: email,
        dailyTokens: tokenLength,
      },
    });
  }

  static async getUser(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  static async updateUser(email: string, tokenLength: number) {
    const user = await this.getUser(email);
    if (user === null) {
      return await this.createUser(email, tokenLength);
    }

    console.log(user);

    return await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        dailyTokens: user.dailyTokens + tokenLength,
      },
    });
  }
}
