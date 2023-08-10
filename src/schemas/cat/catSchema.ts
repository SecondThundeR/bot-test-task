import z from "zod";

/**
 * Since Dog API has the same API structure as theCatAPI.com,
 * `getRandomDog` will use this schema
 */
export const CatResponseSchema = z.array(
  z.object({
    url: z.string().url(),
  })
);
