import { Prisma, PrismaClient } from "@prisma/client";
import cron from "node-cron";

const prisma = new PrismaClient();

/**
 * This class provides methods for interacting with the database to perform operations related to user data.
 */
export class DataInteractionService {
  static async resetDailyCounter() {
    await prisma.user.updateMany({
      data: {
        dailyTokens: 0,
      },
    });
    const users = await prisma.user.findMany();
    console.log(users);
    console.log("Daily counter reset successfully.");
  }

  /**
   * Creates a new user in the database with the specified email and token length.
   */
  static async createUser(email: string, tokenLength: number) {
    return await prisma.user.create({
      data: {
        email: email,
        dailyTokens: tokenLength,
      },
    });
  }

  /**
   * Retrieves a user from the database based on the specified email.
   */
  static async getUser(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  /**
   * Retrieves the number of daily tokens for the user with the specified email.
   */
  static async getTokens(email: string) {
    const user = await this.getUser(email);
    if (user === null) {
      return 0;
    }
    return user.dailyTokens;
  }

  /**
   * Updates the number of daily tokens for the user with the specified email.
   * If the user does not exist, a new user will be created with the specified email and token length.
   */
  static async updateUser(email: string, tokenLength: number) {
    const user = await this.getUser(email);
    if (user === null) {
      return await this.createUser(email, tokenLength);
    }

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
