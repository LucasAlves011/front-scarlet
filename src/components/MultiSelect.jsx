import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Tags({dados}) {


  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={ dados !== undefined ? dados : []}
        getOptionLabel={(option) => option.value}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Categorias"
            placeholder="Categorias"
          />
        )}
      />
    </Stack>
  );
}
