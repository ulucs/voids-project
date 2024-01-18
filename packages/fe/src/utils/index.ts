export const head = <T>(aoi: T[] | T) => (Array.isArray(aoi) ? aoi[0] : aoi);

export const formatDate = (date: Date | string) =>
  (typeof date === "string" ? date : date.toISOString()).split("T")[0];
