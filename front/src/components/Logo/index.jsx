import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

const SignInLogo = ({ className }) => (
  <>
    <Avatar className={className}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h2" variant="h5">
      Войти в систему Грузоперевозки
    </Typography>
  </>
);

export default SignInLogo;
