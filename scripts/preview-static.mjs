import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, isAbsolute, join, relative, resolve, sep } from "node:path";

const port = Number(process.env.PORT || 3000);
const rootDir = resolve(process.cwd(), "out");

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
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function getStats(filePath) {
  try {
    return statSync(filePath);
  } catch {
    return null;
  }
}

function toFilePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  if (!cleanPath.startsWith("/") || cleanPath.includes("\0")) {
    throw new URIError("Invalid URL path");
  }

  const filePath = resolve(rootDir, `.${cleanPath}`);
  const relativePath = relative(rootDir, filePath);
  if (
    relativePath === ".." ||
    relativePath.startsWith(`..${sep}`) ||
    isAbsolute(relativePath)
  ) {
    return null;
  }

  return filePath;
}

function sendFile(request, response, filePath, status = 200) {
  const type = contentTypes[extname(filePath).toLowerCase()] || "application/octet-stream";
  if (request.method === "HEAD") {
    response.writeHead(status, { "Content-Type": type });
    response.end();
    return;
  }

  const stream = createReadStream(filePath);
  stream.on("error", () => {
    if (response.headersSent) {
      response.destroy();
      return;
    }
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Nie można odczytać pliku.");
  });
  stream.on("open", () => {
    response.writeHead(status, { "Content-Type": type });
    stream.pipe(response);
  });
}

const server = http.createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  if (!existsSync(rootDir)) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Brak katalogu out/. Uruchom najpierw: npm run build");
    return;
  }

  const requestUrl = request.url || "/";
  let filePath;
  try {
    filePath = toFilePath(requestUrl);
  } catch {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("400 Bad Request");
    return;
  }

  if (!filePath) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("403 Forbidden");
    return;
  }

  if (getStats(filePath)?.isDirectory()) {
    const queryIndex = requestUrl.indexOf("?");
    const pathname = queryIndex < 0 ? requestUrl : requestUrl.slice(0, queryIndex);
    if (!pathname.endsWith("/")) {
      const query = queryIndex < 0 ? "" : requestUrl.slice(queryIndex);
      response.writeHead(308, { Location: `${pathname}/${query}` });
      response.end();
      return;
    }
    filePath = join(filePath, "index.html");
  } else if (!getStats(filePath) && !extname(filePath)) {
    filePath = `${filePath}.html`;
  }

  if (!getStats(filePath)?.isFile()) {
    const notFoundPage = join(rootDir, "404.html");

    if (getStats(notFoundPage)?.isFile()) {
      sendFile(request, response, notFoundPage, 404);
      return;
    }

    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("404 Not Found");
    return;
  }

  sendFile(request, response, filePath);
});

server.listen(port, () => {
  console.log(`Static preview available at http://localhost:${server.address().port}`);
});
