import { cpSync, mkdirSync, rmSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
cpSync("static", "dist/static", { recursive: true });
cpSync("static/index.html", "dist/index.html");

console.log("Built static site in dist/");
