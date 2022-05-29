import clsx from 'clsx';
import { memo } from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import {
  Login,
  Home,
  Profile,
  MyTuiTion,
  TransactionHistory,
  Identify,
} from '../../index';
import styles from './main.module.scss';

function Main({ navFixed }) {
  const { main: main_style, navFixed: navFixed_style } = styles;

  return (
    <div className={clsx(main_style, { [navFixed_style]: navFixed })}>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/hoc-phi" element={<MyTuiTion />}></Route>
          <Route
            path="/lich-su-giao-dich"
            element={<TransactionHistory />}
          ></Route>
          <Route path="/xac-minh" element={<Identify />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default memo(Main);
