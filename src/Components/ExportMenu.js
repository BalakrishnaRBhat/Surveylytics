import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function ExportMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEXCClose = () => {
    props.to_excel()
    setAnchorEl(null);
  };

  const handleCSVClose = () => {
    props.to_csv()
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant='contained' color='secondary' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Export
      </Button>
      <Menu
        id="export-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={handleEXCClose}>To Excel</MenuItem>
        <MenuItem onClick={handleCSVClose}>To CSV</MenuItem>
      </Menu>
    </div>
  );
} 