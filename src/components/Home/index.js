import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './home.module.scss';
import { CheckLogin, CheckBox, ComfirmModal } from '../index';
import { getHocPhiInfoByMagdApi, dongHocPhiApi, profileApi } from '../../api';
import { constants } from '../../constants';
import { useNavigate } from 'react-router';
import { actions } from '../index';

function Home() {
  const { FORMAT_MONEY } = constants;
  const { setPaymentInfo } = actions;
  const { theme, user, accept } = useSelector((state) => state);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [rulesFull, setRulesFull] = useState(false);
  const [hocphiNo, setHocphiNo] = useState(0);
  const [paymentMoney, setPaymentMoney] = useState(0);
  const [mssv, setMssv] = useState('');
  const [magd, setMagd] = useState('');
  const [message, setMessage] = useState('');
  const [currUser, setCurrUser] = useState({});

  const {
    'payment-form': paymentForm_style,
    'student-info': studentInfo_style,
    'user-info': userInfo_style,
    'tuition-info': tuitionInfo_style,
    'payment-info': paymentInfo_style,
    'form-group': formGroup_style,
    'btn-accept': btnAccept_style,
    'rules-full': rulesFull_style,
    'form-title': formTitle_style,
    disable: disabled_style,
    message: message_style,
    rules: rules_style,
    home: home_style,
    dark: dark_style,
  } = styles;

  const hanlePayment = async (e) => {
    e.preventDefault();
    if (accept) {
      setMessage(
        'Hệ thống đang kiểm tra mssv và mã giao dịch, sẽ chuyển hướng nhanh thôi!!!'
      );
      const inputPaymentInfo = {
        email: user.email,
        userMoney: paymentMoney,
        userMssv: user.mssv,
        userMagd: magd,
      };
      dispatch(setPaymentInfo(inputPaymentInfo));
      const Options = {
        method: 'POST',
        headers: {
          Accept:
            'application/json, text/plain, */*, application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${user.email}&&mssv=${user.mssv}`,
      };
      const res = await fetch(dongHocPhiApi, Options);
      const result = await res.json();
      if (result.code === 0) {
        navigate('/xac-minh', { replace: true });
      } else {
        setMessage('Hệ thống lỗi vui lòng thử lại trong giây lát');
      }
    } else {
      setMessage('Vui lòng chấp nhận các điều khoảng và dịch vụ');
    }
  };

  const handleChange = async () => {
    const res = await fetch(
      getHocPhiInfoByMagdApi + `?mssv=${mssv}&magd=${magd}`
    );
    const result = await res.json();
    setHocphiNo(result.data);
  };

  useEffect(() => {
    handleChange();
  }, [mssv, magd]);

  useEffect(() => {
    fetch(profileApi + `?mssv=${user.mssv}`)
      .then((res) => res.json())
      .then((result) => setCurrUser(result.data));
  }, []);

  return (
    <div className={clsx(home_style, { [dark_style]: theme })}>
      <CheckLogin></CheckLogin>
      <h1 className={formTitle_style}>Đóng học phí</h1>
      <div className={paymentForm_style}>
        <div className={studentInfo_style}>
          <div className={userInfo_style}>
            <div className={clsx(formGroup_style, disabled_style)}>
              <label htmlFor="username">Tên người dùng: </label>
              <input value={user.name} type="text" id="username" disabled />
            </div>
            <div className={clsx(formGroup_style, disabled_style)}>
              <label htmlFor="sdt">Số điện thoại: </label>
              <input value={user.sdt} type="text" id="sdt" disabled />
            </div>
            <div className={clsx(formGroup_style, disabled_style)}>
              <label htmlFor="email">Email: </label>
              <input value={user.email} type="text" id="email" disabled />
            </div>
          </div>
          <div className={tuitionInfo_style}>
            <div className={formGroup_style}>
              <label htmlFor="mssv">Mã số sinh viên: </label>
              <input
                onChange={(e) => setMssv(e.target.value)}
                type="text"
                id="mssv"
              />
            </div>
            <div className={formGroup_style}>
              <label htmlFor="ma-gd">Mã giao dịch: </label>
              <input
                onChange={(e) => setMagd(e.target.value)}
                type="text"
                id="ma-gd"
              />
            </div>
          </div>
        </div>
        <div className={paymentInfo_style}>
          <div className={clsx(formGroup_style, disabled_style)}>
            <label htmlFor="unpaid-tuition">Học phí nợ: </label>
            <input
              value={
                hocphiNo ? FORMAT_MONEY('' + hocphiNo) : FORMAT_MONEY('' + 0)
              }
              type="text"
              id="unpaid-tuition"
              disabled
            />
          </div>
          <div className={clsx(formGroup_style, disabled_style)}>
            <label htmlFor="avai-money">số dư khả dụng: </label>
            <input
              value={FORMAT_MONEY('' + currUser.sodu)}
              type="text"
              disabled
              id="avai-money"
            />
          </div>
          <div className={formGroup_style}>
            <label htmlFor="payment-money">Số tiền thanh toán: </label>
            <input
              onChange={(e) => setPaymentMoney(e.target.value)}
              type="text"
              id="payment-money"
            />
          </div>
          <div
            className={clsx(formGroup_style, rules_style, {
              [rulesFull_style]: rulesFull,
            })}
          >
            <div>
              <p>Điều khoảng và dịch vụ:</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis recusandae unde fugit at minima magnam quod, eum
                voluptatem voluptate ex suscipit doloremque voluptatibus
                explicabo quas nisi. Natus voluptas vel voluptatum deleniti esse
                odio reprehenderit nostrum numquam adipisci dicta illum, ratione
                maiores itaque est, doloribus nesciunt! Labore aliquid eum ex
                totam rerum earum id commodi magnam! Tenetur maiores
                perspiciatis enim repellat molestias amet aut dignissimos nemo
                quasi nostrum similique, cupiditate, unde quisquam. Sunt ex
                laboriosam nisi iusto est laudantium quaerat perspiciatis
                praesentium ut, delectus illum recusandae! Eius quidem
                voluptatem autem accusantium temporibus esse consequuntur
                nesciunt sapiente? Et nesciunt inventore quibusdam ad.
              </p>
            </div>
            <a onClick={() => setRulesFull(!rulesFull)}>
              {!rulesFull ? 'Xem thêm' : 'Rút gọn'}
            </a>
          </div>
          <div className={clsx(formGroup_style, rules_style)}>
            <div className={btnAccept_style}>
              <CheckBox lable={'Đồng ý'} />
            </div>
            {message ? <i className={message_style}>{message}</i> : ''}
          </div>
          <div className={formGroup_style}>
            <button onClick={hanlePayment}>Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Home);
