import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { Nav, Main, Footer, ScrollToTop } from '../index';

import styles from './App.module.scss';

function App() {
  const { App: App_style, dark: dark_style } = styles;
  const { theme } = useSelector((state) => state.uiStore);

  return (
    <div
      className={clsx(App_style, {
        [dark_style]: theme,
      })}
    >
      <ScrollToTop />

      <Nav />

      <Main />

      <Footer />
    </div>
  );
}

export default App;
