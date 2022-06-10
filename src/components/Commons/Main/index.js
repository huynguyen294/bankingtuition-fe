import { memo } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import {
  Login,
  Home,
  Profile,
  MyTuiTion,
  TransactionHistory,
  Identify,
  HandleModals,
  SimpleBackdrop,
  Guide,
} from '../../index';
import styles from './main.module.scss';

function Main() {
  const { main: main_style } = styles;
  const { backdrop } = useSelector((state) => state.uiStore);

  return (
    <div className={main_style}>
      <Container>
        <HandleModals />
        <SimpleBackdrop open={backdrop}></SimpleBackdrop>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/hoc-phi" element={<MyTuiTion />}></Route>
          <Route
            path="/lich-su-giao-dich"
            element={<TransactionHistory />}
          ></Route>
          <Route path="/xac-minh" element={<Identify />}></Route>
          <Route path="/guide" element={<Guide />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Container>
    </div>
  );
}

export default memo(Main);
