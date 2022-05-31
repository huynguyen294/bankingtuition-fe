import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './transaction-history.module.scss';
import { actions, CheckLogin } from '../index';
import { constants } from '../../redux/constants';

function TransactionHistory() {
  const { fetchLsgd } = actions;
  const { FORMAT_MONEY } = constants;
  const { uiStore, userStore } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { theme } = uiStore;
  const { user, lsgdList } = userStore;
  const [lsgd, setLsgd] = useState({});

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
    if (lsgdList.length) {
      setLsgd(lsgdList[lsgdList.length - 1]);
    }
  }, [lsgdList]);

  useEffect(() => {
    if (!lsgdList.length) {
      dispatch(fetchLsgd(user.mssv));
    }
  }, []);

  return (
    <div className={clsx(TH_style, { [dark_style]: theme })}>
      <CheckLogin />
      <h1 className={Title_style}>Lịch sử giao dịch</h1>
      <div className={blockTH_style}>
        <div className={boxListTH_style}>
          <ul className={listTH_style}>
            {lsgdList.length ? (
              lsgdList
                .map((item) => (
                  <li
                    key={item._id}
                    className={item_style}
                    onClick={() => setLsgd({ ...item })}
                  >
                    <div className={cardGroup_style}>
                      <p>{item.thoigian_giaodich}</p>
                      <p className={cardTitle_style}>GD: {item.ten_gd}</p>
                    </div>
                    <h2>-{FORMAT_MONEY('' + item.tien_tru)}</h2>
                  </li>
                ))
                .reverse()
            ) : (
              <li>Bạn chưa có giao dịch nào cả!!</li>
            )}
          </ul>
        </div>
        <div className={currentTransaction_style}>
          <h2>Chi tiết giao dịch</h2>
          {lsgd !== {} ? (
            <div className={boxDetail_style}>
              <p>
                <span>Tên giao dịch:</span> {lsgd.ten_gd}
              </p>
              <p>
                <span>Mã giao dịch:</span> {lsgd.ma_gd}
              </p>
              <p>
                <span>Số dư ở thời điểm giao dịch:</span>
                {' ' + FORMAT_MONEY('' + lsgd.sodu_hientai)}
              </p>
              <p>
                <span>Thời gian giao dịch:</span> {lsgd.thoigian_giaodich}
              </p>
              <p>
                <span>Số tiền bị trừ:</span>
                {' ' + FORMAT_MONEY('' + lsgd.tien_tru)}
              </p>
            </div>
          ) : (
            <h5>Chưa có giao dịch nào được chọn!!!</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(TransactionHistory);
