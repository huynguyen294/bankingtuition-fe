import clsx from 'clsx';
import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './profile.module.scss';
import { CheckLogin, imageUrls, actions } from '../index';
import { constants } from '../../redux/constants';

function Profile() {
  const {
    'block-profile': blockProfile_style,
    'box-user-info': boxUserInfo_style,
    'user-info': userInfo_style,
    'current-transaction': currentTransaction_style,
    'form-group': formGroup_style,
    'box-info': boxInfo_style,
    title: Title_style,
    disable: disabled_style,
    'list-TH': listTH_style,
    'card-group': cardGroup_style,
    'card-title': cardTitle_style,
    'box-list-TH': boxListTH_style,
    'btn-disabled': btn_disabled_style,
    item: item_style,
    avatar: avavtar_style,
    profile: profile_style,
    dark: dark_style,
  } = styles;

  const { FORMAT_MONEY } = constants;
  const { fetchLsgd, fetchUpdateUser } = actions;

  const { uiStore, userStore } = useSelector((state) => state);
  const { theme } = uiStore;
  const { user, lsgdList } = userStore;
  const dispatch = useDispatch();

  const [userProfile, setUserProfile] = useState({
    mssv: '',
    sodu: '',
    name: '',
    sdt: '',
    email: '',
  });

  const currentHistoryLenght = useMemo(() => {
    if (lsgdList.length) {
      return lsgdList.length - 4;
    }
  }, [lsgdList]);

  const handleUpdateUserProfile = () => {
    if (
      !(
        user.name === userProfile.name &&
        user.email === userProfile.email &&
        user.sdt === userProfile.sdt &&
        user.mssv === userProfile.mssv
      )
    ) {
      dispatch(fetchUpdateUser({ newUser: userProfile, oldMssv: user.mssv }));
    }
  };

  useEffect(() => {
    if (!lsgdList.length) {
      dispatch(fetchLsgd(user.mssv));
    }
    setUserProfile((prev) => ({
      ...prev,
      name: user.name,
      mssv: user.mssv,
      sodu: Number(user.sodu),
      email: user.email,
      sdt: user.sdt,
    }));
  }, [user]);

  return (
    <div className={clsx(profile_style, { [dark_style]: theme })}>
      <CheckLogin />
      <h1 className={Title_style}>Thông tin tài khoảng</h1>
      <div className={blockProfile_style}>
        <div className={boxUserInfo_style}>
          <div className={userInfo_style}>
            <div className={formGroup_style}>
              <img
                className={avavtar_style}
                src={imageUrls.avatar}
                alt="Avatar"
              />
              <div className={boxInfo_style}>
                <div className={clsx(formGroup_style, disabled_style)}>
                  <label htmlFor="avai-money">số dư: </label>
                  <input
                    value={FORMAT_MONEY(`${userProfile.sodu}`)}
                    type="text"
                    id="avai-money"
                    disabled
                  />
                </div>
                <div className={clsx(formGroup_style, disabled_style)}>
                  <label htmlFor="name">Tên người dùng: </label>
                  <input
                    value={userProfile.name}
                    type="text"
                    id="name"
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={clsx(formGroup_style, disabled_style)}>
                  <label htmlFor="name">MSSV: </label>
                  <input
                    value={userProfile.mssv}
                    type="text"
                    id="mssv"
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        mssv: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={clsx(formGroup_style, disabled_style)}>
                  <label htmlFor="sdt">Số điện thoại: </label>
                  <input
                    value={userProfile.sdt}
                    type="text"
                    id="sdt"
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        sdt: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className={clsx(formGroup_style, disabled_style)}>
                  <label htmlFor="email">Email: </label>
                  <input
                    value={userProfile.email}
                    type="text"
                    id="email"
                    onChange={(e) =>
                      setUserProfile((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
                <button
                  disabled={
                    user.name === userProfile.name &&
                    user.email === userProfile.email &&
                    user.sdt === userProfile.sdt &&
                    user.mssv === userProfile.mssv
                  }
                  className={clsx({
                    [btn_disabled_style]:
                      user.name === userProfile.name &&
                      user.email === userProfile.email &&
                      user.sdt === userProfile.sdt &&
                      user.mssv === userProfile.mssv,
                  })}
                  onClick={handleUpdateUserProfile}
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={currentTransaction_style}>
          <h3>Giao dịch gần đây</h3>
          <div className={boxListTH_style}>
            <ul className={listTH_style}>
              {lsgdList.length ? (
                lsgdList
                  .map((item, idx) => {
                    if (idx > currentHistoryLenght) {
                      return (
                        <li key={item._id} className={item_style}>
                          <div className={cardGroup_style}>
                            <p>{item.thoigian_giaodich}</p>
                            <p className={cardTitle_style}>GD: {item.ten_gd}</p>
                          </div>
                          <h2>-{FORMAT_MONEY('' + item.tien_tru)}</h2>
                        </li>
                      );
                    }
                  })
                  .reverse()
              ) : (
                <li>bạn chưa có giao dịch nào !!!</li>
              )}
              <Link to={'/lich-su-giao-dich'}>Xem tất cả</Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Profile);
