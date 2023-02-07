import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';
import { ColumnDefinition, DataTableWithId } from './DataTableTypes';

type Props<T> = {
  id?: string;
  headCells: ColumnDefinition<T>[];
};

export const DataTableSkeleton = <T extends DataTableWithId>({ id, headCells }: Props<T>) => {
  return (
    <TableRow id={id} data-testid={id}>
      {Object.values(headCells).map((_, index) => (
        <TableCell colSpan={headCells.length} key={`skeleton-cell-${index}`}>
          <Skeleton animation="wave" />
        </TableCell>
      ))}
    </TableRow>
  );
};
