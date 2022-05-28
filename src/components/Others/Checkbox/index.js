import clsx from 'clsx';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './checkbox.module.scss';
import { actions } from '../../index';

function Checkbox({ lable }) {
  const { setAccept } = actions;
  const { theme, accept } = useSelector((state) => state);
  const dispatch = useDispatch();

  const {
    'checkbox-icon': checkboxIcon_style,
    checkbox: checkbox_style,
    active: active_style,
    dark: dark_style,
  } = styles;

  return (
    <div
      className={clsx(checkbox_style, {
        [active_style]: accept,
        [dark_style]: theme,
      })}
      onClick={() => {
        dispatch(setAccept(!accept));
      }}
    >
      <div className={checkboxIcon_style}>
        <i className="fa-solid fa-check"></i>
      </div>
      <span href="#">{lable}</span>
    </div>
  );
}

export default memo(Checkbox);
