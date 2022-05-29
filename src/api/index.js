import axios from 'axios';
//chú ý: tất cả api trả về
//code: 0 => thành công
//code: 1 => thất bại
//code: 404 => api sai, không tìm thấy api
//code: 500 => server lỗi

axios.create({
  baseURL: 'https://bankingtuition.herokuapp.com',
});

//mô tả [POST] truyền vào tk, mk. Sau khi ktra trong db trả về
//đăng nhập thành công hay thất bại
export const loginApi = '/user/login';
//mô tả [GET] truyền mssv. Sau khi ktra trong db trả về
//thông tin profile sv
export const profileApi = '/user/profile';
//mô tả [GET] truyền mssv. Sau khi ktra trong db trả về
//lịch sử giao dịch của sinh viên
export const lichSuGiaoDichApi = '/user/profile/lich_su_giao_dich';
//mô tả [GET] truyền mssv. Sau khi ktra trong db trả về
//thông tin các học phí của sinh viên
export const getHocPhiInfoApi = '/hocphi/thong_tin_hoc_phi_user/';
//mô tả [GET] truyền mssv và mã gd. Sau khi ktra trong db trả về
//thông tin các học phí của sinh viên
export const getHocPhiInfoByMagdApi =
  'https://bankingtuition.herokuapp.com/hocphi/thong_tin_hoc_phi';
//mô tả [POST] truyền thông tin đóng học phí của sv
//gữi mail cho sv và trả về thành công hay thất bại
export const dongHocPhiApi =
  'https://bankingtuition.herokuapp.com/hocphi/dong_hoc_phi';
//mô tả [POST] truyền mã do sv nhập. Sau khi ktra trả về
//xác minh thành công hay thất bại
export const xacMinhApi =
  'https://bankingtuition.herokuapp.com/hocphi/xac_minh';
//mô tả [POST] truyền thông tin form. Sau khi ktra trong db
//xử lí thanh toán cho sinh viên và trả về
//thanh toán thành công hay thất bại
export const xuLiThanhToanApi =
  'https://bankingtuition.herokuapp.com/hocphi/xu_li_thanh_toan';
