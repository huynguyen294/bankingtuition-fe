import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { Nav, Main, Footer, ScrollToTop } from '../index';

import styles from './App.module.scss';

function App() {
  const { App: App_style, dark: dark_style } = styles;
  const theme = useSelector((state) => state.theme);

  const [navFixed, setNavFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setNavFixed(true);
      } else {
        setNavFixed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navFixed]);

  return (
    <div
      className={clsx(App_style, {
        [dark_style]: theme,
      })}
    >
      <ScrollToTop />

      <Nav navFixed={navFixed} />

      <Main navFixed={navFixed} />

      <Footer />
    </div>
  );
}

export default App;
