import React /* useState */ from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// import { useInput, validateEmail, validatePassword } from '../../utils';
// import { loginUser } from '../../redux/actions';
import {
  NameField,
  SurnameField,
  MiddleNameField,
  BirthdayField,
  SubmitButton,
  EmailField,
  AdressBlock,
  RoleField,
} from './Components';

const useInput = () => ['some temp data', () => null];
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const classes = useStyles();

  const { value: name, bind: bindName } = useInput('');
  const { value: surname, bind: bindSurname } = useInput('');
  const { value: middleName, bind: bindMiddleName } = useInput('');

  // const [emailError, setEmailError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    console.log(name, surname, middleName);
    e.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container justify="space-between" spacing={3}>
            <NameField {...bindName} />
            <MiddleNameField {...bindMiddleName} />
            <SurnameField {...bindSurname} />
            <BirthdayField />
            <EmailField />
            <AdressBlock />
            <RoleField />
            <SubmitButton className={classes.submit} />
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default connect(null, (/* dispatch */) => ({}))(SignIn);
