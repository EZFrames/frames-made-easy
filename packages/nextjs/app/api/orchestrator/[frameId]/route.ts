import { NextRequest, NextResponse } from "next/server";
import { FrameMetadataType, FrameRequest, getFrameHtmlResponse, getFrameMessage } from "@coinbase/onchainkit/frame";

export const getFrameById = (id: number) => {
  return {
    buttons: [
      {
        label: `Home`,
      },
      {
        action: "link",
        label: "OnchainKit",
        target: "https://onchainkit.xyz",
      },
      {
        action: "post_redirect",
        label: "Dog pictures",
      },
    ],
    image: {
      src: `https://proxy.wrpcd.net/?url=https%3A%2F%2Ffal.media%2Ffiles%2Fkangaroo%2FpCG1MdbuiVonnhx0TLi5Q.jpeg&s=2ccf08f7863c7af641ddaa906919ce073607aa92ed98b2a16320d91e7bc12646`,
    },
    state: {
      time: new Date().toISOString(),
    },
  };
};

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const text = message.input || "";
  let state = {
    page: 0,
  };
  try {
    state = JSON.parse(decodeURIComponent(message.state?.serialized));
  } catch (e) {
    console.error(e);
  }

  /**
   * Use this code to redirect to a different page
   */
  if (message?.button === 3) {
    return NextResponse.redirect("https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms", {
      status: 302,
    });
  }

  return new NextResponse(getFrameHtmlResponse(getFrameById(1) as FrameMetadataType));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
