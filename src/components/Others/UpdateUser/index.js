import { memo } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { loginApi } from '../../../api';
import { actions } from '../../index';

function UpdateUser() {
  const { setUser } = actions;
  const dispatch = useDispatch();
  const store = useStore();

  const handleUpdateUser = async () => {
    const { user } = store.getState();
    const Options = {
      method: 'POST',
      headers: {
        Accept:
          'application/json, text/plain, */*, application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${user.username}&&password=${user.password}`,
    };

    const res = await fetch(loginApi, Options);
    const result = await res.json();

    dispatch(setUser(result.user));
  };

  store.subscribe(handleUpdateUser);

  return null;
}

export default memo(UpdateUser);
