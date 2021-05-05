import React, { ChangeEvent } from 'react';
import { SortDirection } from 'types/sort';
import { SelectInput } from 'vcc-ui';

type Props = {
  sortValue: SortDirection;
  onSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const BreedListControl = ({ sortValue, onSortChange }: Props) => {
  return (
    <SelectInput label="Sortera" value={sortValue} onChange={onSortChange}>
      <option value="asc">Namn, stigande</option>
      <option value="desc">Namn, fallande</option>
    </SelectInput>
  );
};

export default BreedListControl;
