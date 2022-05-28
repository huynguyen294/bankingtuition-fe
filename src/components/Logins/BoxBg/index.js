import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import styles from './box-bg.module.scss';
import { imageUrls } from '../../index';

function BoxBg() {
  const { theme } = useSelector((state) => state);

  const {
    'box-bg': boxBg_style,
    'bg-title': bgTitle_style,
    bg: bg_style,
    dark: dark_style,
  } = styles;

  return (
    <div className={clsx(boxBg_style, { [dark_style]: theme })}>
      <div className={bgTitle_style}>
        <h1> Đăng nhập</h1>
      </div>
      <img
        className={bg_style}
        src={theme ? imageUrls.logoBgDark : imageUrls.logoBgLight}
        alt="Background Logo"
      ></img>
    </div>
  );
}

export default memo(BoxBg);
