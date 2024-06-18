export const getFrameById = (id: number) => {
  return {
    buttons: [
      {
        label: `Home ${id}`,
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
