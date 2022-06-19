import { RedisClientType } from "redis";
import { CharactersDao } from "./dao";

var fetchMock: jest.Mock;

jest.mock("@/utils/fetch", () => {
  fetchMock = jest.fn();
  return fetchMock;
});

describe(CharactersDao.name, () => {
  let dao: CharactersDao;
  
  beforeAll(async() => {
    dao = new CharactersDao(redisMock as unknown as RedisClientType);
  })

  test("should return cached result", async() => {
    const cached = JSON.stringify({a: "cached"});

    redisMock.get.mockImplementationOnce(() => cached);

    const res = await dao.getCharacter('url');

    expect(res).toEqual(JSON.parse(cached));
    expect(redisMock.get).toHaveBeenCalledTimes(1);
    expect(redisMock.get).toHaveBeenCalledWith('url');
  })

  test('should fetch if cache not present', async() => {
    const fetched = "fetched";

    redisMock.get.mockImplementationOnce(() => null);
    fetchMock.mockImplementationOnce(() => fetched);

    const res = await dao.getCharacter('url');

    expect(res).toEqual(fetched);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('url');
  })
})

const redisMock = {
  get: jest.fn(),
  set: jest.fn()
};