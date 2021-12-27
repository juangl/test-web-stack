import { createApi } from "unsplash-js";
import { Random } from "unsplash-js/dist/methods/photos/types";

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch.apply(null, args));

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch,
});

export const getRandomAvatar = async () => {
  const response = await unsplash.photos.getRandom({
    count: 1,
    query: "person",
  });

  return response.response[0] as Random;
};
