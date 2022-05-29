import { memo, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useNavigate } from 'react-router';

function CheckLogin() {
  const store = useStore();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.userStore);

  useEffect(() => {
    //ktra lần đầu vào web
    if (!isLogin) {
      navigate('/login', { replace: true });
    }
    const unSubcribe = store.subscribe(() => {
      if (!isLogin) {
        navigate('/login', { replace: true });
      }
    });
    return () => {
      unSubcribe();
    };
  }, [isLogin]);

  return null;
}

export default memo(CheckLogin);
