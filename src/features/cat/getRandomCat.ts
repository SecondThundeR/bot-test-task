import axios from "axios";

import { CAT_API_ENDPOINT } from "@/constants/endpoints";
import { CatResponseSchema } from "@/schemas/cat/catSchema";
import { parseResponse } from "@/utils/zod/parseResponse";
import { processError } from "@/utils/features/processError";

export async function getRandomCat() {
  try {
    const res = await axios.get(CAT_API_ENDPOINT, {
      headers: {
        "x-api-key": process.env.CAT_API_KEY,
      },
    });
    return await parseResponse(res.data, CatResponseSchema);
  } catch (error: unknown) {
    processError(error, "Failed to fetch random cat!");
  }
}
