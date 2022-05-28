import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './profile.module.scss';
import { CheckLogin, imageUrls } from '../index';
import { constants } from '../../constants';
import { lichSuGiaoDichApi, profileApi } from '../../api';

function Profile() {
  const { FORMAT_MONEY } = constants;
  const { theme, user } = useSelector((state) => state);
  const [lsgdList, setLsgdList] = useState([]);
  const [currUser, setCurrUser] = useState({});
  const currentHistoryLenght = lsgdList.length - 4;

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
    item: item_style,
    avatar: avavtar_style,
    profile: profile_style,
    dark: dark_style,
  } = styles;

  const getLsgdList = () => {
    fetch(lichSuGiaoDichApi + '?mssv=' + user.mssv)
      .then((res) => res.json())
      .then((result) => setLsgdList([...result.data]));
  };

  const getProfile = () => {
    fetch(profileApi + `?mssv=${user.mssv}`)
      .then((res) => res.json())
      .then((result) => setCurrUser({ ...result.data }));
  };

  useEffect(() => {
    getLsgdList();
    getProfile();
  }, []);

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
                    value={FORMAT_MONEY(`${currUser.sodu}`)}
                    type="text"
                    disabled
                    id="avai-money"
                  />
                </div>
                <div className={clsx(formGroup_style, disabled_style)}>
                  <label htmlFor="name">Tên người dùng: </label>
                  <input value={user.name} type="text" disabled id="name" />
                </div>
                <div className={clsx(formGroup_style, disabled_style)}>
                  <label htmlFor="sdt">Số điện thoại: </label>
                  <input value={user.sdt} type="text" disabled id="sdt" />
                </div>
                <div className={clsx(formGroup_style, disabled_style)}>
                  <label htmlFor="email">Email: </label>
                  <input value={user.email} type="text" disabled id="email" />
                </div>
                <button>Chỉnh sửa</button>
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
