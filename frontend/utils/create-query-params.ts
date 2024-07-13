export function createQueryParams(filters: TFilters = {}) {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      queryParams.append(key, value.toString());
    }
  });

  return queryParams.toString();
}