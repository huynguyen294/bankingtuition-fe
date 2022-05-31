import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './login-block.module.scss';
import { actions } from '../..';

function LoginBlock({ isLoginBtn }) {
  const { userLogin, setLoginMessage } = actions;

  const { uiStore, userStore } = useSelector((state) => state);
  const { theme, loginMessage } = uiStore;
  const { isLogin } = userStore;
  const dispatch = useDispatch();
  const negative = useNavigate();

  const [formActive, setFormActive] = useState(isLoginBtn);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    'login-form': loginForm_style,
    'register-form': registerForm_style,
    'or-line': orLine_style,
    'login-block': loginBlock_style,
    'login-title': loginTitle_style,
    'login-api': loginApi_style,
    'login-forms': loginForms_style,
    'btn-text': btnText_style,
    'login-title-line': loginTitleLine_style,
    forms: forms_style,
    active: active_style,
    message: message_style,
    btn: btn_style,
    dark: dark_style,
  } = styles;

  const handleFromActive = () => {
    setFormActive(!formActive);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(userLogin({ username, password }));
  };

  // xử lí khi ấn nút đăng nhập, đăng kí khi đang ở trong login page
  useEffect(() => {
    setFormActive(!isLoginBtn);
  }, [isLoginBtn]);

  useEffect(() => {
    if (isLogin) {
      negative('/', { replace: true });
    }
    return () => {
      setLoginMessage('');
    };
  }, [isLogin]);

  return (
    <div className={clsx(loginBlock_style, { [dark_style]: theme })}>
      <div className={clsx(loginTitle_style, { [active_style]: formActive })}>
        <a
          onClick={() => {
            if (formActive) setFormActive(false);
          }}
          className={btn_style}
        >
          Đăng nhập
        </a>
        <a
          onClick={() => {
            if (!formActive) setFormActive(true);
          }}
          className={btn_style}
        >
          Đăng kí
        </a>
        <div className={loginTitleLine_style}></div>
      </div>
      <div className={clsx(loginForms_style, { [active_style]: formActive })}>
        <form className={clsx(forms_style, loginForm_style)}>
          <input
            type="text"
            placeholder="Email/số điện thoại"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}> Đăng nhập</button>
          {loginMessage ? <i className={message_style}>{loginMessage}</i> : ''}
          <a href="#">Quên mật khẩu?</a>
        </form>
        <form className={clsx(forms_style, registerForm_style)}>
          <h1>
            Chào mừng đến với <span>TDTUPAY</span>
          </h1>
          <input type="text" placeholder="Email/số điện thoại" />
          <button>Tiếp theo</button>
        </form>
      </div>
      <div className={orLine_style}>
        <hr />
        <span>Hoặc</span>
        <hr />
      </div>
      <div className={loginApi_style}>
        <a href="#" className={btn_style}>
          <i className="fa fa-facebook" />
          <p className={btnText_style}>Facebook</p>
        </a>
        <a href="#" className={btn_style}>
          <i className="fa fa-google" />
          <p className={btnText_style}>Google</p>
        </a>
      </div>
      <p className={message_style}>
        {formActive ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}
        <a onClick={handleFromActive}>
          {formActive ? ' Đăng nhập' : ' Đăng ký'}
        </a>
      </p>
    </div>
  );
}

export default memo(LoginBlock);
