import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import styles from './guide.module.scss';

function Guide() {
  const { theme } = useSelector((state) => state.uiStore);
  const {
    guide: guide_style,
    'guide-title': guideTitle_style,
    part: part_style,
    'part-title': partTitle_style,
    dark: dark_style,
  } = styles;

  return (
    <div className={clsx(guide_style, { [dark_style]: theme })}>
      <h1 className={guideTitle_style}>Giới thiệu trang web</h1>
      <ul className={part_style}>
        <h3 className={partTitle_style}>Mô tả:</h3>
        <li>- Đây là trang web hỗ trợ sinh viên đóng học phí trực tuyến bao gồm các tính năng: tìm kiếm học phí nợ (thông tin mã giao dịch của học phí có ở trang thông tin học phí), đóng học phí có xác nhận otp, ghi lại lịch sử khi thực hiện giao dịch, thay đổi thông tin cá nhân</li>
      </ul>
      <ul className={part_style}>
        <h3 className={partTitle_style}>Chú ý:</h3>
        <li>- để thực hiện ĐÓNG HỌC PHÍ hãy thay đổi thông tin email cá nhân để nhận mã OTP</li>
        <li>- thời gian đăng nhập có thể sẽ chậm do server free, hãy chịu khó đợi nhé!!!</li>
        <li>- trang web có 2 giao diện sáng và tối</li>
        <li>- dữ liệu trên trang web đều là ảo</li>
        <li>- trang web không hỗ trợ tính năng đăng kí vì học phí là data giả</li>
        <li>
          - khi reload sẽ reset lại tất cả dữ liệu, kể cả trạng thái đăng nhập
        </li>
        <li>
          - phải ĐĂNG NHẬP mới có thể sử dụng các chức năng như: xem thông tin tài khoảng, xem thông tin các học phí, xem lịch sử giao dịch, thực hiện giao dịch đóng học phí...
        </li>
        <li>
          - các tính năng chưa thực hiện: chưa thực
          hiện responsive.
        </li>
      </ul>
      <ul className={part_style}>
        <h3 className={partTitle_style}>Tài khoản dành cho khách:</h3>
        <li>- username: kh1</li>
        <li>- password: 1234</li>
      </ul>
    </div>
  );
}

export default memo(Guide);