import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './checkbox.module.scss';

function Checkbox({ lable, getChecked }) {
  const { theme } = useSelector((state) => state.uiStore);
  const [checked, setChecked] = useState(false);

  const {
    'checkbox-icon': checkboxIcon_style,
    checkbox: checkbox_style,
    active: active_style,
    dark: dark_style,
  } = styles;

  useEffect(() => {
    getChecked(checked);
  }, [checked]);

  return (
    <div
      className={clsx(checkbox_style, {
        [active_style]: checked,
        [dark_style]: theme,
      })}
      onClick={() => {
        setChecked(!checked);
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
