import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CsvDownload from 'react-json-to-csv'

export default function ExportMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEXCClose = () => {
    props.to_excel()
    setAnchorEl(null);
  };

  const handleClose = () => {
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
        onClose={handleClose}
      >
        <MenuItem onClick={handleEXCClose}><Button variant='outlined'>To Excel</Button></MenuItem>
        <MenuItem onClick={handleClose}><CsvDownload data={props.data} filename={props.filename}><Button style={{width: "80px", background: '#fafafa', border: "none"}} variant='text' size='small'>To Csv</Button></CsvDownload></MenuItem>
      </Menu>
    </div>
  );
} 