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
    if (this.getUser(email) === null) {
      return await this.createUser(email, tokenLength);
    }

    return await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        dailyTokens: tokenLength,
      },
    });
  }
}
