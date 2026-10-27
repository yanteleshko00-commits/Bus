
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 10000;
const HOST = "0.0.0.0";
const indexPath = path.join(__dirname, "index.html");

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host || "localhost"}`).pathname;

  if (pathname === "/favicon.ico") {
    res.writeHead(204);
    return res.end();
  }

  if (pathname === "/" || pathname === "/index.html") {
    fs.readFile(indexPath, (error, data) => {
      if (error) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Не удалось загрузить index.html. Проверь наличие файла.");
      }

      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache"
      });
      res.end(data);
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
});

server.listen(PORT, HOST, () => {
  console.log(`Грузовики запущены на порту ${PORT}`);
});
