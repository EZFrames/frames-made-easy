import { ReactNode } from "react";
import { NextResponse } from "next/server";
import fs from "fs";
import { NextApiRequest } from "next";
import path from "path";
import { html } from "satori-html";
import satori from "satori/wasm";

const robotoArrayBuffer = fs.readFileSync(path.resolve(process.cwd(), "public/fonts/roboto.ttf"));

const createImageFromHtml = async (HTML: string) => {
  const markup = html`${HTML}`;
  const svg = await satori(markup as ReactNode, {
    width: 600,
    height: 400,
    fonts: [
      {
        name: "Roboto",
        data: robotoArrayBuffer,
        weight: 400,
        style: "normal",
      },
    ],
  });
  return svg;
};

export default async function POST(req: NextApiRequest) {
  const { HTML } = req.body;
  const svg = await createImageFromHtml(HTML);
  return new NextResponse(svg, { headers: { "Content-Type": "image/svg+xml" } });
}
