import clsx from 'clsx';
import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { actions } from '../../index';
import styles from './notification.module.scss';

function Notification({ description, type }) {
  const {
    container: container_style,
    modal: modal_style,
    'modal-title': modalTitle_style,
    'modal-body': modalBody_style,
    'modal-footer': modalFooter_style,
    success: success_style,
  } = styles;

  const { setUpdateProfileStatus } = actions;
  const dispatch = useDispatch();

  return (
    <div
      className={clsx(container_style, {
        [success_style]: type === 'success',
      })}
    >
      <div className={modal_style}>
        <div className={modalTitle_style}>
          <i className="fas fa-circle-check"></i>
          <h4>Success!!!</h4>
        </div>
        <div className={modalBody_style}>
          <p>{description}</p>
        </div>
        <hr />
        <div className={modalFooter_style}>
          {type === 'success' ? (
            <button
              onClick={() => dispatch(setUpdateProfileStatus({ code: -999 }))}
            >
              Ok
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Notification);
