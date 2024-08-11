import React, { useState, useCallback, useMemo } from 'react';
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash/debounce';
import './searchbar.css';

const Header = ({ onSearch, specializations }) => {
  const [name, setName] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [nameError, setNameError] = useState('');

  const validateName = (value) => {
    if (value.length > 50) {
      setNameError('Name must be 50 characters or less');
    } else {
      setNameError('');
    }
  };

  const handleNameChange = useCallback((e) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  }, []);

  const handleSpecializationChange = useCallback((event) => {
    setSelectedSpecializations(event.target.value);
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce(() => {
        if (!nameError) {
          onSearch({ name, specializations: selectedSpecializations });
        }
      }, 300),
    [name, selectedSpecializations, nameError, onSearch]
  );

  const handleSearch = useCallback(() => {
    debouncedSearch();
  }, [debouncedSearch]);

  const isSearchDisabled = useMemo(() => {
    return nameError !== '' || (name === '' && selectedSpecializations.length === 0);
  }, [name, selectedSpecializations, nameError]);

  return (
    <div className="header-container">
      <Grid container spacing={2} alignItems="center" className='header-grid'>
        <Grid item xs={12} md={4}>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            error={!!nameError}
            helperText={nameError}
            InputProps={{
              className: 'input-field'
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Specializations</InputLabel>
            <Select
              multiple
              value={selectedSpecializations}
              onChange={handleSpecializationChange}
              label="Specializations"
              className='input-field'
              renderValue={(selected) => (
                <div className="chip-container">
                  {selected.map((value) => (
                    <Chip key={value} label={value} className="specialization-chip" />
                  ))}
                </div>
              )}
            >
              {specializations.map((specialization) => (
                <MenuItem key={specialization} value={specialization}>
                  {specialization}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSearch}
            className='search-button'
            startIcon={<SearchIcon />}
            disabled={isSearchDisabled}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;