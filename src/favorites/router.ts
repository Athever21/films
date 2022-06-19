import { Request, Response } from "express";
import { CreateList } from "./dto/createList";
import { FavoriteService } from "./services";
import processBody from "@/utils/processBody";
import excel from "exceljs";

export class FavoriteRouter {
  constructor(private readonly service: FavoriteService) {}

  async getAllLists(req: Request, res: Response) {
    let { name } = req.query;

    const page = Number(req.query.page) ? parseInt(req.query.page as any) : 0;

    const favorites = await this.service.getAll(name as string, page);

    return res.json(favorites);
  }

  async createList(req: Request, res: Response) {
    const movie: CreateList = await processBody(CreateList, req.body);
    const created = await this.service.createList(movie);
    return res.json(created);
  }

  async getList(req: Request, res: Response) {
    const { id } = req.params;
    const list = await this.service.getList(id);
    return res.json(list);
  }

  async getListExcel(req: Request, res: Response) {
    const { id } = req.params;
    const list = (await this.service.getList(id)) as any;

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Favorite");

    worksheet.columns = [
      { header: "Characters", key: "characters", width: 30 },
      { header: "Movies", key: "movies", width: 30 },
    ];

    let moviesNames = list.movies.map((x: any) => x.title);

    let characterSet = new Set();

    for (const movie of list.movies) {
      for (const character of movie.characters) {
        characterSet.add(character);
      }
    }

    const characters = [...characterSet];

    const rows = [];

    const len = moviesNames.length > characters.length ? moviesNames.lrngth : characters.length;
    for (let i = 0; i < len; i++) {
      const row = {} as any;

      if (characters[i]) {
        row["characters"] = characters[i];
      }

      if (moviesNames[i]) {
        row["movies"] = moviesNames[i];
      }

      rows.push(row);
    }

    worksheet.addRows(rows);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "favorite.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  }
}
