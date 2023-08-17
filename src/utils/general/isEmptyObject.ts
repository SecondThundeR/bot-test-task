export function isEmptyObject<T>(data?: T): data is undefined {
  return !data || (Array.isArray(data) && data.length === 0);
}
