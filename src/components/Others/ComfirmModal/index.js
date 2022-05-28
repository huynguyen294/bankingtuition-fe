import clsx from 'clsx'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './comfirm-modal.module.scss'

function ComfirmModal(){

    const {theme} = useSelector(state => state)
 
    const {
        'modal-header': modalHeader_style,
        'modal-title': modalTitle_style,
        'modal-body': modalBody_style,
        container: container_style,
        modal: modal_style,
        dark: dark_style,
    } = styles

    return (
        <div className={container_style}>
            <div className={clsx(modal_style, {[dark_style]: theme})}>
                <div className={modalHeader_style}>
                    <h1 className={modalTitle_style}>Thanh toán thành công</h1>
                </div>
                <hr />
                <div className={modalBody_style}>
                    <i>Bạn đã thanh toán thành công</i><br />
                    <Link to={'/'}>Quay lại trang chủ</Link>
                </div>
            </div>
        </div>
        )
}

export default memo(ComfirmModal)