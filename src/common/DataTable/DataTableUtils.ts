export type Order = 'asc' | 'desc';

export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  if (!a[orderBy]) {
    return -1;
  }
  if (!b[orderBy]) {
    return 1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((
  a: { [key in Key]: number | string | boolean },
  b: { [key in Key]: number | string | boolean }
) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = <T>(array: T[], comparator: (a: T, b: T) => number) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const createCheckboxFilterValues = <T>(rows: T[], filterId: keyof T) => {
  const rowValues = rows.map((row) => row[filterId]);
  //@ts-ignore
  return [...new Set(rowValues)].filter((item) => !!item);
};

export const filterRowsBySearchTextInput = <T>(
  rows: T[],
  filterId: keyof T,
  searchTextInputValues: { [key: string]: string }[]
) =>
  searchTextInputValues.reduce((acc, curr) => {
    const filteredRows = rows.filter((row: T) =>
      //@ts-ignore
      String(row[Object.keys(curr).toString()])
        .toLowerCase()
        .includes(Object.values(curr).toString().toLocaleLowerCase())
    );
    acc = filteredRows;

    return acc;
  }, rows);
