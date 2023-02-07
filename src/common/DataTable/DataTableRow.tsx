import React, { ElementType } from 'react';

import { TableCell, TableCellBaseProps, TableRow, Tooltip } from '@mui/material';

import { ColumnDefinition, DataTableWithId } from './DataTableTypes';
import { makeStyles } from 'tss-react/mui';

// TODO jss-to-tss-react codemod: usages of this hook outside of this file will not be converted.
export const tableStyles = makeStyles()(() => ({
  emptyTable: {
    borderBottom: 'none',
  },
  cell: {
    padding: 0,
  },
}));

type Props<T> = {
  rowId: string;
  labelId: string;
  headCells: ColumnDefinition<T>[];
  row: T;
  borders?: boolean;
  onRowClick?: (rowId: string) => void;
  disableRowClick?: boolean;
  selectedRows?: T[];
};

export const DataTableRow = <T extends DataTableWithId>({
  rowId,
  labelId,
  row,
  headCells,
  borders = true,
  onRowClick,
  selectedRows,
  disableRowClick = false,
}: Props<T>): React.ReactElement => {
  const { classes } = tableStyles();

  return (
    <>
      <TableRow
        hover={!disableRowClick}
        tabIndex={-1}
        key={rowId}
        style={{ cursor: disableRowClick ? 'auto' : 'pointer' }}
        selected={
          disableRowClick ? false : !!selectedRows?.find((selectedRow) => selectedRow.id === rowId)
        }
        onClick={() => (onRowClick && !disableRowClick ? onRowClick(rowId) : null)}
      >
        {headCells.map((cell) => {
          const { id, alignCell } = cell;
          const value = row[id] ? row[id] : '-';
          const render: any = cell.render;
          return (
            <Tooltip
              title={cell.rowTooltipText ? cell.rowTooltipText(row) : ''}
              arrow
              placement="bottom-start"
              key={id.toString()}
            >
              <TableCell
                component={'th' as unknown as ElementType<TableCellBaseProps>}
                align={alignCell ? alignCell : 'inherit'}
                id={labelId}
                scope="row"
                className={!borders ? classes.emptyTable : ''}
              >
                {render ? render(row) : <>{value}</>}
              </TableCell>
            </Tooltip>
          );
        })}
      </TableRow>
    </>
  );
};
