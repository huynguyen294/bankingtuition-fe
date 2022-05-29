import clsx from 'clsx';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import { CheckLogin, ComfirmModal } from '../index';
import styles from './identify.module.scss';
import { dongHocPhiApi, xacMinhApi } from '../../api';

function Identify() {
  const { userStore, uiStore } = useSelector((state) => state);
  const { theme } = uiStore;
  const { paymentInfo } = userStore;
  const [message, setMessage] = useState({});
  const [code, setCode] = useState(0);
  const [success, setSuccess] = useState(false);

  const {
    'box-identify': boxIdentify_style,
    'block-identify': blockIdentify_style,
    message: message_style,
    dark: dark_style,
  } = styles;

  const { userMoney, userMssv, userMagd, email } = paymentInfo;

  const hanleSendMail = async () => {
    setMessage({
      done: false,
      message: 'Hệ thống đang gữi mail, vui lòng chờ trong giây lát',
    });
    const Options = {
      method: 'POST',
      headers: {
        Accept:
          'application/json, text/plain, */*, application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${email}&&mssv=${userMssv}`,
    };
    fetch(dongHocPhiApi, Options)
      .then((res) => res.json())
      .then((result) => {
        if (result.code === 0) {
          setMessage({
            done: true,
            message: 'Hệ thống đã gữi lại mail thành công',
          });
        } else {
          setMessage({
            done: false,
            message: 'Hệ thống lỗi vui lòng thử lại trong giây lát',
          });
        }
      });
  };

  const handleIdentify = async (e) => {
    setMessage({
      done: false,
      message: 'Hệ thống đang xác minh, vui lòng chờ trong giây lát',
    });
    setTimeout(() => {
      if (!success) {
        setMessage({
          done: false,
          message: 'Quá thời gian chờ, hệ thống lỗi, xin mời quay lại sau',
        });
      }
    }, 10000);
    e.preventDefault();
    const Options = {
      method: 'POST',
      headers: {
        Accept:
          'application/json, text/plain, */*, application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `code=${code}&&userMoney=${userMoney}&&userMssv=${userMssv}&&userMagd=${userMagd}`,
    };
    fetch(xacMinhApi, Options)
      .then((res) => res.json())
      .then((result) => {
        if (result.code === 0) {
          setSuccess(true);
        } else if (result.code === -1) {
          setMessage({
            done: false,
            message: 'Mã xác minh sai, vui lòng nhập lại',
          });
        } else {
          setMessage({
            done: false,
            message: 'Hệ thống xảy ra lỗi vui lòng quay lại sau ít phút',
          });
        }
      });
  };

  return (
    <div className={clsx(boxIdentify_style, { [dark_style]: theme })}>
      <CheckLogin />
      <div className={blockIdentify_style}>
        {success ? <ComfirmModal /> : ''}
        <h1>Vui lòng nhập mã xác thực đã được gửi về email {email}</h1>
        <p>Mã giao dịch sẽ mất hiệu lực sau 5 phút</p>
        <div>
          <input onChange={(e) => setCode(e.target.value)} type="text" />
          <button onClick={handleIdentify} disabled={message.done}>
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
