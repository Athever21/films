import { PrismaClient } from "@prisma/client";
import { FavoriteDao } from "./dao";

describe(FavoriteDao.name, () => {
  let dao: FavoriteDao;

  beforeAll(async () => {
    dao = new FavoriteDao(dbMock as unknown as PrismaClient);
  });

  test("should fetch all favorites", async () => {
    const all = [{ a: "b" }];

    dbMock.favorite.findMany.mockImplementationOnce(() => all);

    const expected = {
      skip: 0 * 25,
      take: 25,
      where: {
        name: { contains: "" },
      },
    };

    const res = await dao.getAllLists(0, "");

    expect(res).toEqual(all);
    expect(dbMock.favorite.findMany).toHaveBeenCalledTimes(1);
    expect(dbMock.favorite.findMany).toHaveBeenCalledWith(expected);
  });

  test("should fetch single list", async () => {
    const single = { a: "b" };
    const id = "id";

    dbMock.favorite.findUnique.mockImplementationOnce(() => single);

    const expected = {
      where: {
        uuid: id,
      },
    };

    const res = await dao.getList(id);

    expect(res).toEqual(single);
    expect(dbMock.favorite.findUnique).toHaveBeenCalledTimes(1);
    expect(dbMock.favorite.findUnique).toHaveBeenCalledWith(expected);
  });

  test("should create list", async () => {
    const single = { a: "b" };

    dbMock.favorite.create.mockImplementationOnce(() => single);

    const expected = {
      data: single,
    };

    const res = await dao.createList(single as any);

    expect(res).toEqual(single);
    expect(dbMock.favorite.create).toHaveBeenCalledTimes(1);
    expect(dbMock.favorite.create).toHaveBeenCalledWith(expected);
  });
});

const dbMock = {
  favorite: {
    findMany: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};
