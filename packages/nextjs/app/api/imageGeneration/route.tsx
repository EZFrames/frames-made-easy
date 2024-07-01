import { NextRequest, NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import parse from "html-react-parser";

export const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
export const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

const uploadToIPFS = async (file, name) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("pinataMetadata", JSON.stringify({ name }));
  formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
    body: formData,
  };
  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", options);
  const data = await response.json();
  return data.IpfsHash;
};

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const { html } = payload;
  const imageResponse = new ImageResponse(
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
  const imageBuffer = await imageResponse
    .blob()
    .then(blob => blob.arrayBuffer())
    .then(buffer => Buffer.from(buffer));


  try {
    const ipfsHash = await uploadToIPFS(new Blob([imageBuffer], { type: "image/png" }), "image");
    const imageUrl = `${GATEWAY_URL}/${ipfsHash}`;

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Error uploading image to Pinata", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
