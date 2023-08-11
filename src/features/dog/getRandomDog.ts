import axios from "axios";

import { DOG_API_ENDPOINT } from "@/constants/endpoints";
import { LOCALE } from "@/constants/locale";

import { CatResponseSchema } from "@/schemas/cat/catSchema";

import { processError } from "@/utils/features/processError";
import { parseResponse } from "@/utils/zod/parseResponse";

export async function getRandomDog() {
  try {
    const res = await axios.get(DOG_API_ENDPOINT, {
      headers: {
        "x-api-key": process.env.DOG_API_KEY,
      },
    });
    return await parseResponse(res.data, CatResponseSchema);
  } catch (error: unknown) {
    processError(error, LOCALE.dog.failedFetch);
  }
}
