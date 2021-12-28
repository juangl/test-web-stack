const PAGE_SIZE = 6;

export function getInitialPaginationVariables(page: number = 1, search: string) {
  return {
    first: PAGE_SIZE * page,
    name: search,
  };
}

export function getFetchMoreVariables(data, search: string) {
  return {
    first: PAGE_SIZE,
    after: data.users.pageInfo.endCursor,
    name: search,
  };
}
