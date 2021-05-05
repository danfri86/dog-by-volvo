import React, { ChangeEvent } from 'react';
import { SortDirection } from 'types/sort';
import { SelectInput } from 'vcc-ui';

type Props = {
  sortValue: SortDirection;
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const BreedListControl = ({ sortValue, onSortChange }: Props) => {
  return (
    <SelectInput label="Sort" value={sortValue} onChange={onSortChange}>
      <option value="asc">Name, ascending</option>
      <option value="desc">Name, descending</option>
    </SelectInput>
  );
};

export default BreedListControl;
