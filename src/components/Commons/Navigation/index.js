import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { memo, useState } from 'react';
import { Container, Row } from 'react-bootstrap';

import { actions, imageUrls } from '../../index';
import styles from './navigation.module.scss';
import { Switch } from '../../index';

function Navigation({ navFixed }) {
  const { setIsLogin } = actions;
  const { uiStore, userStore } = useSelector((state) => state);
  const { theme } = uiStore;
  const { isLogin } = userStore;
  const dispatch = useDispatch();
  const [profileMenuAct, setProfileMenuAct] = useState(false);

  const {
    'nav-main': navMain_style,
    'fixed-top': fixedTop_style,
    'profile-sub-menu': profileSubMenu_style,
    avartar: avartar_style,
    menu: menu_style,
    profile: profile_style,
    left: left_style,
    right: right_style,
    logo: logo_style,
    nav: nav_style,
    dark: dark_style,
    active: active_style,
  } = styles;

  return (
    <div
      className={clsx(nav_style, {
        [dark_style]: theme,
        [fixedTop_style]: navFixed,
        'fixed-top': navFixed,
      })}
    >
      <Container>
        <Row>
          <div className={navMain_style}>
            <div className={clsx(menu_style, left_style)}>
              <h1 id={logo_style}>
                <Link to={isLogin ? '/' : '/login'}>iBanking Fee</Link>
              </h1>
            </div>
            <div className={clsx(menu_style, right_style)}>
              <div className={profile_style}>
                <div
                  className={avartar_style}
                  onClick={() => {
                    setProfileMenuAct(!profileMenuAct);
                  }}
                >
                  {isLogin ? (
                    <img src={imageUrls.avatar} alt="avatar" />
                  ) : (
                    <i className="fa fa-user"></i>
                  )}
                </div>
                <ul
                  className={clsx(profileSubMenu_style, {
                    [active_style]: profileMenuAct,
                  })}
                >
                  <li>
                    <span>Dark mode</span>
                    <Switch left={'On'} right={'Off'} />
                  </li>
                  {isLogin ? (
                    <React.Fragment>
                      <hr />
                      <li>
                        <Link to={'/'}>Thanh toán học phí</Link>
                      </li>
                      <li>
                        <Link to={'/profile'}>Thông tin tài khoảng</Link>
                      </li>
                      <li>
                        <Link to={'/hoc-phi'}>Học phí của tôi</Link>
                      </li>
                      <li>
                        <Link to={'/lich-su-giao-dich'}>Lịch sử giao dịch</Link>
                      </li>
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                  <hr />
                  <li>
                    <Link to={'/guide'}>Giới thiệu trang web</Link>
                  </li>
                  {isLogin ? (
                    <li>
                      <a onClick={() => dispatch(setIsLogin(false))}>
                        Đăng xuất
                      </a>
                    </li>
                  ) : (
                    ''
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default memo(Navigation);
