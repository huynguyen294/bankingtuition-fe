import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CheckLogin, actions } from '../index';
import styles from './identify.module.scss';

function Identify() {
  const {
    'box-identify': boxIdentify_style,
    'block-identify': blockIdentify_style,
    message: message_style,
    dark: dark_style,
  } = styles;
  const { sendMail, fetchHandlePayment, setSendMailStatus } = actions;
  const { userStore, uiStore } = useSelector((state) => state);
  const { theme, sendMailStatus, paymentStatus } = uiStore;
  const { paymentInfo } = userStore;
  const [message, setMessage] = useState({});
  const [code, setCode] = useState(0);
  const dispatch = useDispatch();

  const { userMoney, userMssv, userMagd, email } = paymentInfo;

  const hanleSendMail = () => {
    setMessage({
      done: false,
      message: 'Hệ thống đang gữi lại mail, vui lòng chờ trong giây lát!!!',
    });
    dispatch(sendMail(userMssv, email));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setMessage({
      done: false,
      message: 'Hệ thống đang xác minh, vui lòng chờ trong giây lát',
    });
    dispatch(fetchHandlePayment(code, userMoney, userMssv, userMagd));
  };

  useEffect(() => {
    if (sendMailStatus.code === 0) {
      setMessage({
        done: true,
        message: 'Hệ thống đang đã gữi lại mail thành công!!!',
      });
      dispatch(setSendMailStatus({ code: -999 }));
    } else if (sendMailStatus.code === -1) {
      setMessage({
        done: true,
        message: 'Hệ thống xẩy ra lỗi vui lòng thử lại sau!!!',
      });
    }
    if (paymentStatus.code === -1) {
      setMessage({
        done: true,
        message: 'Hệ thống xẩy ra lỗi vui lòng thử lại sau!!!',
      });
    }

    return () => {
      setMessage({});
    };
  }, [sendMailStatus.code, paymentStatus.code]);

  return (
    <div className={clsx(boxIdentify_style, { [dark_style]: theme })}>
      <CheckLogin />
      <div className={blockIdentify_style}>
        <h1>Vui lòng nhập mã xác thực đã được gửi về email {email}</h1>
        <p>Mã giao dịch sẽ mất hiệu lực sau 5 phút</p>
        <div>
          <input onChange={(e) => setCode(e.target.value)} type="text" />
          <button onClick={handlePayment} disabled={message.done}>
            Xác minh
          </button>
        </div>
        {message ? <i className={message_style}>{message.message}</i> : ''}
        <p>
          Nếu bạn chưa nhận được mã?
          <a onClick={hanleSendMail}> Gữi lại mã</a>
        </p>
      </div>
    </div>
  );
}

export default memo(Identify);
