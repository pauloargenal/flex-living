'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { CheckIcon } from 'lucide-react';

import { getModalButtonClass } from './utils/get-modal-button-class';

interface ModalButtonProps {
  text: string;
  handler: () => unknown;
  textColor?: string;
  backgroundColor?: string;
}

interface ModalIconProps {
  className: string;
  wrapperClassName?: string;
}

interface ModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  titleText: string;
  bodyText: string;
  confirmButton: ModalButtonProps;
  cancelButton?: ModalButtonProps;
  icon?: ModalIconProps;
  allowBackdropClick?: boolean;
}

export default function Modal(props: ModalProps) {
  const {
    visible,
    setVisible,
    titleText,
    bodyText,
    confirmButton,
    cancelButton,
    icon,
    allowBackdropClick = true
  } = props;

  const [mounted, setMounted] = useState(false);

  // This prevents an intermittent server-side rendering error where document is not defined
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!visible || !mounted) {
    return null;
  }

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLElement;

    if (!target.closest('#modal')) {
      setVisible(false);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      setVisible(false);
    }
  };

  const displayClassName = visible ? 'fixed' : 'hidden';

  const confirmButtonClassName = getModalButtonClass({ buttonType: 'confirm', ...confirmButton });
  const cancelButtonClassName = getModalButtonClass({ buttonType: 'cancel', ...cancelButton });

  const iconWrapperClassName = icon?.wrapperClassName || 'flex p-2 rounded-full bg-green-100';

  const portal = createPortal(
    <div role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
      <div
        className={`${displayClassName} inset-0 z-50 flex items-center justify-center w-full h-full bg-black-100 bg-opacity-50`}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          if (allowBackdropClick) {
            onClick(event);
          }
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
          if (allowBackdropClick) {
            onKeyDown(event);
          }
        }}
      >
        <div
          id="modal"
          className="max-w-screen-sm w-fit p-6 rounded-xl bg-white flex gap-6 flex-col z-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={iconWrapperClassName}>
                <CheckIcon className="w-6 h-6 text-white" />
              </div>
              <h2 id="modal-title" className="font-medium text-2xl">
                {titleText}
              </h2>
            </div>
          </div>

          <div id="modal-description" className="text-black-60 text-base font-medium">
            {bodyText}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className={confirmButtonClassName}
              onClick={confirmButton.handler}
              autoFocus
            >
              {confirmButton.text}
            </button>

            {cancelButton && (
              <button
                type="button"
                className={cancelButtonClassName}
                onClick={cancelButton.handler}
              >
                {cancelButton.text}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );

  return portal;
}
