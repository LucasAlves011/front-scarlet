import { useState } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { FormControl, InputLabel } from '@mui/material';
import { useEffect } from 'react';

export default function MultipleSelect({ dados, placeholder, reciever }) {
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

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={placeholder} />}
          variant='filled'
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.2 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          sx={{ minWidth: 500, maxWidth: 800 }}
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