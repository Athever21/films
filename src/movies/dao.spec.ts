import { MovieDao } from "./dao";

var fetchMock: jest.Mock;

jest.mock("@/utils/fetch", () => {
  fetchMock = jest.fn();
  return fetchMock;
});

describe(MovieDao.name, () => {
  let dao: MovieDao;
  
  beforeAll(async() => {
    dao = new MovieDao(redisMock as any, characterDaoMock as any);
  })

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  })

  test("should return cached all movies", async() => {
    const cached = JSON.stringify({a: "cached"});

    redisMock.get.mockImplementationOnce(() => cached);

    const res = await dao.getAllMovies();

    expect(res).toEqual(JSON.parse(cached));
    expect(redisMock.get).toHaveBeenCalledTimes(1);
    expect(redisMock.get).toHaveBeenCalledWith('allMovies');
  })

  test('should return cached single movie', async() => {
    const cached = JSON.stringify({a: "cached"});

    redisMock.get.mockImplementationOnce(() => cached);

    const res = await dao.getMovie(1);

    expect(res).toEqual(JSON.parse(cached));
    expect(redisMock.get).toHaveBeenCalledTimes(1);
    expect(redisMock.get).toHaveBeenCalledWith(`Movie-1`);
  })
})

const redisMock = {
  get: jest.fn(),
  set: jest.fn()
};

const characterDaoMock = {
  getCharacter: jest.fn()
}