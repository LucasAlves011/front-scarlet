import { useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FilledInput, FormControl, InputLabel } from '@mui/material';
import { useEffect } from 'react';

MultipleSelect.defaultProps = {
  variant: 'outlined',
  size: "normal",
  width: 300
}

export default function MultipleSelect({ dados, placeholder, reciever , variant , size, width}) {
  const [selected, setSelected] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => { reciever(selected) }, [selected])

  const getTypeInput = () => {
    if (variant === 'outlined') {
      return <OutlinedInput id="select-multiple-chip" label={placeholder} />
    } else if (variant === 'filled') {
      return <FilledInput id="select-multiple-chip" label={placeholder} />
    } else {
      return <OutlinedInput id="select-multiple-chip" label={placeholder} />
    }
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: {width} }} variant={variant}>
        <InputLabel id="demo-multiple-chip-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selected}
          onChange={handleChange}
          input={getTypeInput()}
          size={size}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.2 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          sx={{ minWidth: {width} + 200, maxWidth: {width} + 400 }}
          placeholder={placeholder}
        >
          {dados.map((e) => (
            <MenuItem
              key={e.id}
              value={e.value}
            >
              {e.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}