import http from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const port = Number(process.env.PORT || 3000);
const rootDir = normalize(join(process.cwd(), "out"));

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function toFilePath(urlPath) {
  const cleanPath = decodeURIComponent((urlPath || "/").split("?")[0]);
  const normalizedPath = normalize(cleanPath).replace(/^(\.\.[/\\])+/, "");
  const requestedPath = join(rootDir, normalizedPath);

  if (cleanPath.endsWith("/")) {
    return join(requestedPath, "index.html");
  }

  return requestedPath;
}

const server = http.createServer((request, response) => {
  if (!existsSync(rootDir)) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Brak katalogu out/. Uruchom najpierw: npm run build");
    return;
  }

  let filePath = toFilePath(request.url || "/");

  if (!existsSync(filePath) && !extname(filePath)) {
    filePath = `${filePath}.html`;
  }

  if (!existsSync(filePath)) {
    const notFoundPage = join(rootDir, "404.html");

    if (existsSync(notFoundPage)) {
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      createReadStream(notFoundPage).pipe(response);
      return;
    }

    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("404 Not Found");
    return;
  }

  const type = contentTypes[extname(filePath).toLowerCase()] || "application/octet-stream";
  response.writeHead(200, { "Content-Type": type });
  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`Static preview available at http://localhost:${port}`);
});
