import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { PaymentSuccess, Notification, actions } from '../../index';

function HandleModals() {
  const dispatch = useDispatch();
  const {} = actions;
  const { paymentStatus, updateProfileStatus } = useSelector(
    (state) => state.uiStore
  );
  const navigate = useNavigate();

  /*  const handleAddVisaCardAction = (action) => {
    if (action.close) {
      dispatch(setAddVisaCardModalAct(false));
    } else if (action.cancel) {
      dispatch(setAddVisaCardModalAct(false));
    } else if (action.confirm) {
      dispatch(setAddVisaCardModalAct(false));
      navigate('/register/sheet');
    }
  }; */

  if (paymentStatus.code === 0) {
    return <PaymentSuccess />;
  } else if (updateProfileStatus.code === 0) {
    return (
      <Notification
        type={'success'}
        description="tài khoảng của bạn đã được cập nhật trên hệ thống"
      />
    );
  } else {
    return null;
  }
}

export default memo(HandleModals);
