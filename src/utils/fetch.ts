import https from "https";

export default (url: string) =>
  new Promise((resolve, rejects) => {
    https.get(url, (res) => {
      let data = "";

      if (res.statusCode !== 200) {
        rejects(res.statusMessage);
      }

      res.on("data", (chunk) => (data += chunk.toString("utf8")));
      res.on("end", () => resolve(JSON.parse(data)));
      res.on("error", (err) => rejects(err));
    });
  });
