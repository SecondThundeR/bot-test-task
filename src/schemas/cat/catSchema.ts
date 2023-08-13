import z from "zod";

/**
 * @description Since Dog API has the same API structure as theCatAPI.com,
 * `getRandomDog` will use this schema too
 */
export const CatResponseSchema = z.array(
  z.object({
    url: z.string().url(),
  }),
);
