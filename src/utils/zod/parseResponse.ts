import { z } from "zod";

export async function parseResponse<T extends z.ZodType<any, any>>(
  data: unknown,
  schema: T
): Promise<z.infer<T>> {
  return await schema.parseAsync(data);
}
