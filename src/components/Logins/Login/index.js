import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import { BoxBg, LoginBlock } from '../index';
import styles from './login.module.scss';

function Login() {
  const { theme, isLoginBtn } = useSelector((state) => state.uiStore);

  const {
    'box-login': boxLogin_style,
    login: login_style,
    dark: dark_style,
  } = styles;

  return (
    <div className={clsx(login_style, { [dark_style]: theme })}>
      <div className={boxLogin_style}>
        <BoxBg />
        <LoginBlock isLoginBtn={isLoginBtn} />
      </div>
    </div>
  );
}

export default memo(Login);
