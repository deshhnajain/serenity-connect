import React from 'react';
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import './searchbar.css';

const Header = ({ onSearch, specializations }) => {
  const [name, setName] = React.useState('');
  const [selectedSpecializations, setSelectedSpecializations] = React.useState([]);

  const handleSearch = () => {
    onSearch({ name, specializations: selectedSpecializations });
  };

  const handleSpecializationChange = (event) => {
    setSelectedSpecializations(event.target.value);
  };

  return (
    <div className="header-container">
      <Grid container  alignItems="center" className='headergrid'>
        <Grid className='gridcontent'>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4} className='gridcontent'>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Specializations</InputLabel>
            <Select
              multiple
              value={selectedSpecializations}
              onChange={handleSpecializationChange}
              label="Specializations"
            >
              {specializations.map((specialization) => (
                <MenuItem key={specialization} value={specialization}>
                  {specialization}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} className='gridcontent'>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
