import type { CSSProperties } from 'react';
import type {
  SelectInputProps,
} from '@mui/material/Select/SelectInput';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface StringSelectProps
{
  inputLabel: string,
  label: string,
  values: Array<string>,
  style?: CSSProperties,
  defaultValue?: string,
  fullWidth?: boolean,
  onChange?: SelectInputProps<string>['onChange'],
}

export function StringSelect(props: StringSelectProps)
{
  const {
    inputLabel,
    label,
    values,
    style,
    defaultValue,
    fullWidth,
    onChange,
  } = props;

  const id = `select-${label}`;
  const labelId = `${id}-label`
  return (
    <FormControl fullWidth={fullWidth} style={style}>
      <InputLabel id={labelId}>{inputLabel}</InputLabel>
      <Select
        label={inputLabel}
        labelId={labelId}
        id={id}
        value={defaultValue}
        onChange={(onChange)}
      >
        {
          values.map((value, i) => (
            <MenuItem key={i} value={value}>{value}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}