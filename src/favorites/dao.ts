import { PrismaClient, Prisma } from "@prisma/client";

export class FavoriteDao {
  private readonly pageSize = 25;

  constructor(private readonly db: PrismaClient) {}

  async getAllLists(page: number, name?: string) {
    return await this.db.favorite.findMany({
      skip: page * this.pageSize,
      take: this.pageSize,
      where: {
        name: { contains: name },
      },
    });
  }

  async createList(list: Prisma.FavoriteCreateInput) {
    return await this.db.favorite.create({
      data: list
    })
  }

  async getList(uuid: string) {
    return await this.db.favorite.findUnique({
      where: {
        uuid
      }
    })
  }
}
