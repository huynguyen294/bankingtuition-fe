import clsx from 'clsx';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../..';
import styles from './switch.module.scss';

function Switch({ left, right }) {
  const { setTheme } = actions;

  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    if (theme) {
      dispatch(setTheme(false));
    } else {
      dispatch(setTheme(true));
    }
  };

  const {
    'switch-btn': switchBtn_style,
    switch: switch_style,
    text: text_style,
    off: off_style,
    circle: circle_style,
  } = styles;

  return (
    <div
      className={switch_style}
      onClick={() => {
        handleChangeTheme();
      }}
    >
      <div className={clsx(switchBtn_style, { [off_style]: !theme })}>
        <p className={text_style}>{left}</p>
        <div className={circle_style}></div>
        <p className={text_style}>{right}</p>
      </div>
    </div>
  );
}

export default memo(Switch);
