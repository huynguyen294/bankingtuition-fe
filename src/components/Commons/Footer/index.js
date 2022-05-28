import { memo } from 'react';
import { useSelector } from 'react-redux';

import clsx from 'clsx';
import styles from './footer.module.scss';

function Footer() {
  const theme = useSelector((state) => state.theme);

  const {
    'fo-copyright': foCopyright_style,
    footer: footer_style,
    dark: dark_style,
  } = styles;

  return (
    <div className={clsx(footer_style, { [dark_style]: theme })}>
      <div className={foCopyright_style}>
        <p>made by Hoang Huy</p>
      </div>
    </div>
  );
}

export default memo(Footer);
