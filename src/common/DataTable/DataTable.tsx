import React, { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import DataTableHeader from './DataTableHeader';
import { filterRowsBySearchTextInput, getComparator, Order, stableSort } from './DataTableUtils';
import { ColumnDefinition, DataTableWithId } from './DataTableTypes';
import { DataTableRow } from './DataTableRow';
import { makeStyles } from 'tss-react/mui';
import { jbColors } from '../../app/theme/jbColors';
import moment, { Moment } from 'moment';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DataTableSkeleton } from './DataTableSkeleton';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const tableStyles = makeStyles()(() => ({
  emptyTable: {
    borderBottom: 'none',
  },
}));

type Props<T> = {
  id: string;
  headCells: ColumnDefinition<T>[];
  rows: T[];
  ariaLabel?: string;
  borders?: boolean;
  rowsPerPageOptions?: number[];
  onRowClick?: (rowId: string) => void;
  disableRowClick?: boolean;
  selectedRows?: T[];
  showPagination?: boolean;
  isLoading?: boolean;
  backGroundColor?: boolean; // change to "variant" if there are more different styled tables
};

export const DataTable = <T extends DataTableWithId>({
  id,
  rows,
  ariaLabel,
  headCells,
  borders = true,
  rowsPerPageOptions = [],
  onRowClick = undefined,
  disableRowClick,
  selectedRows,
  showPagination = false,
  isLoading,
  backGroundColor = false,
}: Props<T>): React.ReactElement => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState('label');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowsFiltered, setRowsFiltered] = useState<T[]>([]);
  const [selectedFiltersState, setSelectedFiltersState] = useState<{ [key: string]: string }[]>([]);
  const [searchFiltersState, setSearchFiltersState] = useState<{ [key: string]: string }[]>([]);

  const tableId = id;
  const { t } = useTranslation();

  const { classes } = tableStyles();

  useEffect(() => {
    setRowsFiltered(rows);
  }, [isLoading]);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const intersectionBy = (rows: T[], filteredValues: any, fn: (x: string) => any) => {
    const filteredValuesArray = new Set(filteredValues.map(fn));
    return rows.filter((row: T) => !filteredValuesArray.has(fn(row as any)));
  };

  const filterRowsByDate = (rows: T[], inputDateValue: DateRange<Moment>, filterId: keyof T) => {
    const start = inputDateValue[0] ? inputDateValue[0].format('YYYY-MM-DD') : null;
    const end = inputDateValue[1] ? inputDateValue[1].format('YYYY-MM-DD') : null;

    if (start && end) {
      return rows.filter(
        (row: T) =>
          start <=
            moment(row[filterId] as string)
              .utc(true)
              .format('YYYY-MM-DD') &&
          moment(row[filterId] as string)
            .utc(true)
            .format('YYYY-MM-DD') <= end
      );
    } else {
      return rows;
    }
  };

  const handleAllChangeClick = (
    checked: boolean,
    selectedFilters: { [key: string]: string }[],
    filterId: keyof T,
    searchFilterValue: string
  ) => {
    //TODO - refactor if statement

    let updatedSelectedFilterState = selectedFiltersState;
    if (checked) {
      updatedSelectedFilterState = selectedFiltersState.filter((selectedFilterState) => {
        return Object.keys(selectedFilterState).find((key) => key !== filterId);
      });
    } else {
      updatedSelectedFilterState = [...selectedFiltersState, ...selectedFilters];
    }

    let filteredRows = rows;

    if (searchFiltersState.length) {
      const rowsFilteredBySearch = filterRowsBySearchTextInput(rows, filterId, searchFiltersState);
      filteredRows = rowsFilteredBySearch;
    }

    //TODO - create separate function
    const findDateFilterValue: any = updatedSelectedFilterState.find(
      (selectedFilterState) => selectedFilterState['lastAction']
    );

    if (findDateFilterValue && findDateFilterValue['lastAction'].some((value: any) => !!value)) {
      filteredRows = filterRowsByDate(
        filteredRows,
        findDateFilterValue['lastAction'],
        'lastAction' as keyof T
      );
    }

    filteredRows = updatedSelectedFilterState.length
      ? updatedSelectedFilterState.reduce((acc, curr) => {
          acc = intersectionBy(
            acc,
            updatedSelectedFilterState,
            (x: any) => x[Object.keys(curr).toString()]
          );

          return acc;
        }, filteredRows)
      : filteredRows;

    setRowsFiltered(filteredRows);
    setSelectedFiltersState(updatedSelectedFilterState);
  };

  const handleSearchFilter = (inputValue: string, filterId: keyof T) => {
    const currentSearchFilterValue = { [filterId]: inputValue };
    let searchFilters = searchFiltersState;
    const filterCurrentFilter = searchFilters.filter((searchFilterState) =>
      Object.keys(searchFilterState).find((key) => key !== filterId)
    );
    if (inputValue) {
      searchFilters = [...filterCurrentFilter, currentSearchFilterValue];
    } else {
      searchFilters = filterCurrentFilter;
    }

    const rowsFilteredBySearch = filterRowsBySearchTextInput(rows, filterId, searchFilters);

    setRowsFiltered(rowsFilteredBySearch);
    setSearchFiltersState(searchFilters);
    setPage(0);
  };

  const handleCheckboxFilterClick = (
    selectedFilter: { [key: string]: string },
    filterId: keyof T,
    checked: boolean,
    searchFilterValue: string,
    isDateFilter?: boolean
  ) => {
    let filteredValues = [selectedFilter];
    if (!checked) {
      if (selectedFiltersState.length) {
        if (isDateFilter) {
          const removedDateValue = selectedFiltersState.filter((selectedFilterState) =>
            Object.keys(selectedFilterState).find((key) => key !== filterId)
          );

          filteredValues = [...removedDateValue, selectedFilter];
        } else {
          filteredValues = [...selectedFiltersState, selectedFilter];
        }
      } else {
        filteredValues = [selectedFilter];
      }
    } else {
      filteredValues = selectedFiltersState.filter(
        (selectedFilterState) =>
          selectedFilterState[filterId as string] !== selectedFilter[filterId as string]
      );
    }

    let filteredRows = rows;

    if (searchFiltersState.length) {
      const rowsFilteredBySearch = filterRowsBySearchTextInput(rows, filterId, searchFiltersState);
      filteredRows = rowsFilteredBySearch;
    }

    //TODO - make it generic not just for last action and create separate function
    const findDateFilterValue: any = filteredValues.find(
      (selectedFilterState) => selectedFilterState['lastAction']
    );

    if (findDateFilterValue && findDateFilterValue['lastAction'].some((value: any) => !!value)) {
      filteredRows = filterRowsByDate(
        filteredRows,
        findDateFilterValue['lastAction'],
        'lastAction' as keyof T
      );
    }

    filteredRows = filteredValues.length
      ? filteredValues.reduce((acc, curr) => {
          acc = intersectionBy(acc, filteredValues, (x: any) => x[Object.keys(curr).toString()]);

          return acc;
        }, filteredRows)
      : filteredRows;

    setRowsFiltered(filteredRows);
    setSelectedFiltersState(filteredValues);
    setPage(0);
  };

  const handleAscSort = (isToggled: boolean, property: keyof T) => {
    if (isToggled) {
      setOrder('asc');
      setOrderBy(property as string);
    } else {
      setOrderBy('');
    }
  };
  const handleDescSort = (isToggled: boolean, property: keyof T) => {
    if (isToggled) {
      setOrder('desc');
      setOrderBy(property as string);
    } else {
      setOrderBy('');
    }
  };

  const handleResetFilterClick = (filterId: keyof T) => {
    let filteredRows = rows;
    const remainingSelectedfilters = selectedFiltersState.filter((selectedFilterState) =>
      Object.keys(selectedFilterState).find((key) => key !== filterId)
    );

    const remainingSearchfilters = searchFiltersState.filter((selectedFilterState) =>
      Object.keys(selectedFilterState).find((key) => key !== filterId)
    );

    if (searchFiltersState.length) {
      filteredRows = filterRowsBySearchTextInput(filteredRows, filterId, remainingSearchfilters);
    }

    //TODO - create function
    const findDateFilterValue: any = remainingSelectedfilters.find(
      (selectedFilterState) => selectedFilterState['lastAction']
    );

    if (findDateFilterValue && findDateFilterValue['lastAction'].some((value: any) => !!value)) {
      filteredRows = filterRowsByDate(
        filteredRows,
        findDateFilterValue['lastAction'],
        'lastAction' as keyof T
      );
    }

    filteredRows = remainingSelectedfilters.length
      ? remainingSelectedfilters.reduce((acc, curr) => {
          acc = intersectionBy(
            acc,
            remainingSelectedfilters,
            (x: any) => x[Object.keys(curr).toString()]
          );

          return acc;
        }, filteredRows)
      : filteredRows;
    setRowsFiltered(filteredRows);
    handleAscSort(false, filterId);
    handleDescSort(false, filterId);

    setSelectedFiltersState(remainingSelectedfilters);
    setSearchFiltersState(remainingSearchfilters);
  };

  // TODO - replace with skeleton
  if (isLoading) {
    return (
      <Box display={'flex'} alignItems={'center'} alignContent={'center'} justifyContent={'center'}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <TableContainer
        sx={{ borderTop: 'none', backgroundColor: backGroundColor ? jbColors.grey.light : '' }}
      >
        <Table size="small" aria-label={ariaLabel} id={tableId}>
          <DataTableHeader
            headCells={headCells}
            order={order}
            setOrderBy={setOrderBy}
            setOrder={setOrder}
            orderBy={orderBy}
            rows={rowsFiltered.length ? rowsFiltered : rows}
            handleAscSort={handleAscSort}
            handleDescSort={handleDescSort}
            handleResetFilterClick={handleResetFilterClick}
            handleAllChangeClick={handleAllChangeClick}
            handleCheckboxFilterClick={handleCheckboxFilterClick}
            handleSearchFilter={handleSearchFilter}
          />
          <TableBody>
            {!rows.length && (
              <TableRow>
                <TableCell colSpan={headCells.length} className={classes.emptyTable}>
                  <Typography variant={'caption'}> No data available</Typography>
                </TableCell>
              </TableRow>
            )}
            {stableSort(rowsFiltered, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rowFiltered, index: number) => {
                return (
                  <DataTableRow
                    key={rowFiltered.id}
                    rowId={rowFiltered.id}
                    labelId={`${tableId}-${id}-${index}`}
                    headCells={headCells}
                    row={rowFiltered}
                    onRowClick={() => (onRowClick ? onRowClick(rowFiltered.id) : null)}
                    selectedRows={selectedRows}
                    borders={borders}
                    disableRowClick={disableRowClick}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 30]}
          component="div"
          count={rowsFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t('documentTable.labels.table.entriesPerPage')}
        />
      )}
    </>
  );
};
