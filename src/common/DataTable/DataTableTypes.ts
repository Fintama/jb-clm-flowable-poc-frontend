import { AlignPropertyParams } from '@mui/material/styles/cssUtils';
import { ReactElement } from 'react';

export enum HeadCellFilterType {
  SORT = 'sort',
  CHECKBOXFILTER = 'checkboxFilter',
  SEARCHFILTER = 'search',
  CHECKBOXANDSEARCHFILTER = 'checkboxAndSearchFilter',
  DATEFILTER = 'dateFilter',
  EMPTY = '',
}

export type ColumnDefinition<T> = {
  id: keyof T;
  label: string | ReactElement;
  filter: HeadCellFilterType;
  filterIsEnum?: boolean;
  filterInputPlaceholder?: string;
  filterInputType?: 'number' | 'text';
  filterValues?: (string | undefined)[];
  width: string;
  render?: (
    row: T,
    index?: number
  ) => false | undefined | JSX.Element | JSX.Element[] | string | null;
  color?: string;
  fontWeight?: number;
  headerTooltipText?: string;
  translationKey?: string;
  rowTooltipText?: (row: T, index?: number) => string;
  alignCell?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
};

export type DataTableWithId = {
  id: string;
};
