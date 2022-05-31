import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './mytuition.module.scss';
import { CheckLogin, imageUrls, actions } from '../index';
import { constants } from '../../redux/constants';

function MyTuiTion() {
  const { fetchHocPhi } = actions;
  const { FORMAT_MONEY } = constants;
  const { uiStore, userStore } = useSelector((state) => state);
  const { theme } = uiStore;
  const { user, hocphiList } = userStore;
  const [hocphi, setHocphi] = useState({});
  const dispatch = useDispatch();

  const {
    'block-TH': blockTH_style,
    'list-TH': listTH_style,
    'box-list-TH': boxListTH_style,
    'current-transaction': currentTransaction_style,
    'card-group': cardGroup_style,
    'card-title': cardTitle_style,
    'box-detail': boxDetail_style,
    item: item_style,
    title: Title_style,
    TH: TH_style,
    dark: dark_style,
  } = styles;

  useEffect(() => {
    if (!hocphiList.length) {
      dispatch(fetchHocPhi(user.mssv));
    }
  }, []);

  useEffect(() => {
    setHocphi(hocphiList[0]);
  }, [hocphiList]);

  return (
    <div className={clsx(TH_style, { [dark_style]: theme })}>
      <CheckLogin />
      <h1 className={Title_style}>Học phí của tôi</h1>
      <div className={blockTH_style}>
        <div className={boxListTH_style}>
          <ul className={listTH_style}>
            {hocphiList
              .map((item) => (
                <li
                  key={item._id}
                  className={item_style}
                  onClick={() => setHocphi({ ...item })}
                >
                  <div className={cardGroup_style}>
                    <p className={cardTitle_style}>
                      Học kì {item.hoc_ki} - năm {item.nam}
                    </p>
                    <p>{FORMAT_MONEY('' + item.hoc_phi_no)}</p>
                  </div>
                  <img
                    src={
                      item.trang_thai === 'paid'
                        ? imageUrls.paid
                        : imageUrls.unpaid
                    }
                    alt="paid"
                  />
                </li>
              ))
              .reverse()}
          </ul>
        </div>
        <div className={currentTransaction_style}>
          <h2>Chi tiết học phí</h2>
          {hocphi ? (
            <div className={boxDetail_style}>
              <p>
                <span>Niên Khóa:</span> {hocphi.nam + ' - ' + (hocphi.nam + 1)}
              </p>
              <p>
                <span>Học kì:</span> {hocphi.hoc_ki}
              </p>
              <p>
                <span>Mã giao dịch:</span> {hocphi.ma_gd}
              </p>
              <p>
                <span>Nợ học phí:</span>
                {' ' + FORMAT_MONEY('' + hocphi.hoc_phi_no)}
              </p>
              <p>
                <span>trạng thái:</span> {hocphi.trang_thai}
              </p>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(MyTuiTion);
