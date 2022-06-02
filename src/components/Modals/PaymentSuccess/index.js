import clsx from 'clsx';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './payment-success.module.scss';

import { actions } from '../../index';

function PaymentSuccess() {
  const {
    'modal-header': modalHeader_style,
    'modal-title': modalTitle_style,
    'modal-body': modalBody_style,
    'modal-footer': modalFooter_style,
    container: container_style,
    modal: modal_style,
    dark: dark_style,
  } = styles;

  const { fetchLsgd, setPaymentStatus } = actions;

  const { uiStore, userStore } = useSelector((state) => state);
  const { theme } = uiStore;
  const { user } = userStore;
  const dispatch = useDispatch();

  return (
    <div className={container_style}>
      <div className={clsx(modal_style, { [dark_style]: theme })}>
        <div className={modalHeader_style}>
          <h1 className={modalTitle_style}>Thanh toán thành công</h1>
        </div>
        <div className={modalBody_style}>
          <i>
            Bạn đã thanh toán thành công, kiểm tra lịch sử giao dịch để biết
            thêm chi tiết giao dịch nhé
          </i>
        </div>
        <div className={modalFooter_style}>
          <Link
            to={'/lich-su-giao-dich'}
            onClick={() => {
              dispatch(fetchLsgd(user.mssv));
              dispatch(setPaymentStatus({ code: -999 }));
            }}
          >
            <button>Xem lịch sử giao dịch</button>
          </Link>
          <Link
            onClick={() => {
              dispatch(setPaymentStatus({ code: -999 }));
            }}
            to={'/'}
          >
            <button>Quay về trang chủ</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(PaymentSuccess);
