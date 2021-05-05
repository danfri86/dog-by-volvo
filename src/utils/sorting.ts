import { SortDirection } from 'types/sort';

export const sortListByKey = <T, K extends keyof T>(
  list: T[],
  sortDirection: SortDirection,
  sortBy: K
): T[] => {
  return list.sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    }

    return a[sortBy] < b[sortBy] ? 1 : -1;
  });
};
