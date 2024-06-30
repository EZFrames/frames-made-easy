import { ReactNode } from "react";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { html } from "satori-html";
import satori from "satori/wasm";

const robotoArrayBuffer = fs.readFileSync(path.resolve(process.cwd(), "public/roboto.ttf"));

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

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const { html } = payload;
  console.log(html);
  const svg = await createImageFromHtml(html);
  console.log(svg);
  return new NextResponse(svg, { headers: { "Content-Type": "image/svg+xml" } });
}
