import React, { Dispatch, SetStateAction } from 'react';

import { Box, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@mui/material';

import { Order } from 'common/utils/arrayUtils';
import { ColumnDefinition, DataTableWithId, HeadCellFilterType } from './DataTableTypes';
import { ReactComponent as UpDownDescendingIcon } from '../../assets/icons/up-down-descending-icon.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/info-icon.svg';
import { DataTableFilter } from '../DataTableFilters/DataTableFilters';
import { Moment } from 'moment'

type Props<T> = {
  headCells: ColumnDefinition<T>[];
  orderBy: string;
  order: Order;
  setOrder: Dispatch<SetStateAction<Order>>;
  setOrderBy: Dispatch<SetStateAction<string>>;
  rows: T[];
  handleResetFilterClick: (filterId: keyof T) => void;
  handleAscSort: (isAscToggled: boolean, property: keyof T) => void;
  handleDescSort: (isAscToggled: boolean, property: keyof T) => void;
  handleAllChangeClick: (
    checked: boolean,
    selectedFilters: { [key: string]: string }[],
    filterId: keyof T,
    searchFilterValue: string
  ) => void;
  handleCheckboxFilterClick: (
    selectedFilters: { [key: string]: string },
    filterId: keyof T,
    checked: boolean,
    searchFilterValue: string,
    isDateFilter?: boolean
  ) => void;
  handleSearchFilter: (inputValue: string, filterId: keyof T) => void;
};

type IconComponentType = React.FunctionComponent<{ className: string }>;

const DataTableHeader = <T extends DataTableWithId>({
  headCells,
  orderBy,
  order,
  setOrder,
  setOrderBy,
  rows,
  handleResetFilterClick,
  handleAscSort,
  handleDescSort,
  handleAllChangeClick,
  handleCheckboxFilterClick,
  handleSearchFilter,
}: Props<T>) => {
  const onRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property: string) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead style={{ borderBottom: 'none', width: '100%' }}>
      <TableRow>
        {headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.label.toString()}
              sortDirection={orderBy === headCell.id ? order : false}
              id={`tablehead-${headCell.id as string}`}
              align={headCell.alignCell ? headCell.alignCell : 'inherit'}
              style={{
                width: headCell.width,
                color: headCell.color,
                fontWeight: headCell.fontWeight,
              }}
            >
              {headCell.filter === HeadCellFilterType.SORT && (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id.toString())}
                  IconComponent={UpDownDescendingIcon as IconComponentType}
                >
                  <Box display={'flex'}>
                    {headCell.label}
                    {headCell.headerTooltipText ? (
                      <Tooltip title={headCell.headerTooltipText} arrow>
                        <Box ml={1} mt={'2px'}>
                          <InfoIcon></InfoIcon>
                        </Box>
                      </Tooltip>
                    ) : null}
                  </Box>
                </TableSortLabel>
              )}
              {(headCell.filter === HeadCellFilterType.CHECKBOXFILTER ||
                headCell.filter === HeadCellFilterType.SEARCHFILTER ||
                headCell.filter === HeadCellFilterType.CHECKBOXANDSEARCHFILTER ||
                headCell.filter === HeadCellFilterType.DATEFILTER) && (
                <DataTableFilter
                  headCell={headCell}
                  rows={rows}
                  handleAscSort={handleAscSort}
                  handleDescSort={handleDescSort}
                  handleResetFilterClick={handleResetFilterClick}
                  handleAllChangeClick={handleAllChangeClick}
                  handleCheckboxFilterClick={handleCheckboxFilterClick}
                  handleSearchFilter={handleSearchFilter}
                />
              )}
              {headCell.filter === HeadCellFilterType.EMPTY && headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default DataTableHeader;
