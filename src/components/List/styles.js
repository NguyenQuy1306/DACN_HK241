import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), minWidth: 120, marginBottom: '30px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
   height:'200px'
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    // height: '75vh', overflow: 'auto',
  },
}));
