import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import parse from "html-react-parser";

// export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const { html } = payload;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {parse(html)}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
