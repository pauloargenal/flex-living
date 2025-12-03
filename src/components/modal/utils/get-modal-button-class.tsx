const baseButtonClassName = 'w-fit py-3 px-6 rounded-lg';
const defaultConfirmTextColor = 'text-white';
const defaultConfirmBackgroundColor = 'bg-green-100';
const defaultCancelTextColor = 'text-black-100';
const defaultCancelBackgroundColor = 'bg-grey-1';

interface GetModalButtonClassArgs {
  buttonType: 'confirm' | 'cancel';
  textColor?: string;
  backgroundColor?: string;
}

export function getModalButtonClass(args: GetModalButtonClassArgs): string {
  const { buttonType, textColor, backgroundColor } = args;

  let buttonClassName = baseButtonClassName.slice(0);

  if (textColor) {
    buttonClassName += ` ${textColor}`;
  } else if (buttonType === 'confirm') {
    buttonClassName += ` ${defaultConfirmTextColor}`;
  } else {
    buttonClassName += ` ${defaultCancelTextColor}`;
  }

  if (backgroundColor) {
    buttonClassName += ` ${backgroundColor}`;
  } else if (buttonType === 'confirm') {
    buttonClassName += ` ${defaultConfirmBackgroundColor}`;
  } else {
    buttonClassName += ` ${defaultCancelBackgroundColor}`;
  }

  return buttonClassName;
}
