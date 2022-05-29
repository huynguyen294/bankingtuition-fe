import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './home.module.scss';
import { CheckLogin, CheckBox } from '../index';
import { getHocPhiInfoByMagdApi, dongHocPhiApi } from '../../api';
import { constants } from '../../redux/constants';
import { useNavigate } from 'react-router';
import { actions } from '../index';

function Home() {
  const { FORMAT_MONEY } = constants;
  const { setPaymentInfo, fetchProfile } = actions;
  const { userStore, uiStore } = useSelector((state) => state);
  const { theme } = uiStore;
  const { user } = userStore;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({
    mssv: '',
    magd: '',
    paymentMoney: '',
  });
  const [uiController, setUiController] = useState({
    homeAcceptRule: false,
    message: '',
    rulesFull: false,
    hocphiNo: 0,
  });

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
    'input-money': inputMoney_style,
    disable: disabled_style,
    message: message_style,
    rules: rules_style,
    home: home_style,
    dark: dark_style,
  } = styles;

  const hanlePayment = async (e) => {
    e.preventDefault();
    if (uiController.homeAcceptRule) {
      setUiController((prev) => ({
        ...prev,
        message:
          'Hệ thống đang kiểm tra mssv và mã giao dịch, sẽ chuyển hướng nhanh thôi!!!',
      }));
      const inputPaymentInfo = {
        email: user.email,
        userMoney: userInput.paymentMoney,
        userMssv: user.mssv,
        userMagd: userInput.magd,
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
        setUiController((prev) => ({
          ...prev,
          message: 'Hệ thống lỗi vui lòng thử lại trong giây lát',
        }));
      }
    } else {
      setUiController((prev) => ({
        ...prev,
        message: 'Vui lòng chấp nhận các điều khoảng và dịch vụ',
      }));
    }
  };

  const handleCheckedRule = (checked) => {
    setUiController((prev) => ({ ...prev, homeAcceptRule: checked }));
  };

  useEffect(() => {
    const handleChange = async () => {
      if (userInput.mssv && userInput.magd) {
        const res = await fetch(
          getHocPhiInfoByMagdApi +
            `?mssv=${userInput.mssv}&magd=${userInput.magd}`
        );
        const result = await res.json();
        setUiController((prev) => ({ ...prev, hocphiNo: result.data }));
      }
    };
    handleChange();
  }, [userInput.mssv, userInput.magd]);

  return (
    <div className={clsx(home_style, { [dark_style]: theme })}>
      <CheckLogin />
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
                onChange={(e) =>
                  setUserInput((prev) => ({ ...prev, mssv: e.target.value }))
                }
                type="text"
                id="mssv"
              />
            </div>
            <div className={formGroup_style}>
              <label htmlFor="ma-gd">Mã giao dịch: </label>
              <input
                onChange={(e) =>
                  setUserInput((prev) => ({ ...prev, magd: e.target.value }))
                }
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
                uiController.hocphiNo
                  ? FORMAT_MONEY('' + uiController.hocphiNo)
                  : FORMAT_MONEY('' + 0)
              }
              type="text"
              id="unpaid-tuition"
              disabled
            />
          </div>
          <div className={clsx(formGroup_style, disabled_style)}>
            <label htmlFor="avai-money">số dư khả dụng: </label>
            <input
              value={FORMAT_MONEY('' + user.sodu)}
              type="text"
              disabled
              id="avai-money"
            />
          </div>
          <div className={clsx(formGroup_style, inputMoney_style)}>
            <label htmlFor="payment-money">Số tiền thanh toán: </label>
            <p>
              {userInput.paymentMoney
                ? FORMAT_MONEY(userInput.paymentMoney + '')
                : ''}
            </p>
            <input
              onChange={(e) =>
                setUserInput((prev) => ({
                  ...prev,
                  paymentMoney: e.target.value,
                }))
              }
              type="text"
              id="payment-money"
            />
          </div>
          <div
            className={clsx(formGroup_style, rules_style, {
              [rulesFull_style]: uiController.rulesFull,
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
            <a
              onClick={() =>
                setUiController((prev) => ({
                  ...prev,
                  rulesFull: !uiController.rulesFull,
                }))
              }
            >
              {!uiController.rulesFull ? 'Xem thêm' : 'Rút gọn'}
            </a>
          </div>
          <div className={clsx(formGroup_style, rules_style)}>
            <div className={btnAccept_style}>
              <CheckBox getChecked={handleCheckedRule} lable={'Đồng ý'} />
            </div>
            {uiController.message ? (
              <i className={message_style}>{uiController.message}</i>
            ) : (
              ''
            )}
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
