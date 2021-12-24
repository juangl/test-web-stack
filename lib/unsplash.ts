import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
import { Random } from "unsplash-js/dist/methods/photos/types";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  // a fetch compatible argument is expected and node-fetch should satisfy it.
  // Unfortunately TS seems angry so we disable the check for now
  // @ts-ignore
  fetch: nodeFetch,
});

export const getRandomAvatar = async () => {
  const response = await unsplash.photos.getRandom({
    count: 1,
    query: 'person',
  });

  return response.response[0] as Random
};
