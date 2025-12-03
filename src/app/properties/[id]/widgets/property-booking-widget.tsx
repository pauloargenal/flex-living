'use client';

import { useEffect, useState } from 'react';

import Dropdown from '@/components/dropdown';
import Modal from '@/components/modal/modal';
import Snackbar from '@/components/snackbar';

interface PropertyBookingWidgetProps {
  price: string;
  locale: Record<string, string>;
}

export function PropertyBookingWidget({ price, locale }: PropertyBookingWidgetProps) {
  const [showModal, setShowModal] = useState(false);
  const [guests, setGuests] = useState('1');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarType, setSnackBarType] = useState<'success' | 'error'>('success');
  const priceNum = parseInt(price.slice(1), 10);
  const pricePerNight = `£${priceNum * 3}`;
  const total = `${pricePerNight + 85}`;

  const formatPrice = (value: string): string => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const numPrice = Number(numericValue);
    return numPrice.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
  };

  useEffect(() => {
    if (snackBarMessage) {
      setTimeout(() => {
        setSnackBarMessage('');
      }, 2000);
    }
  }, [snackBarMessage]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-black-10 sticky top-24">
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-3xl font-bold text-black-100">{price}</span>
        <span className="text-black-50">{locale.perNight}</span>
      </div>

      <div className="space-y-4 mb-6">
        <label htmlFor="checkIn" className="block text-sm text-black-60 mb-1" id="checkInLabel">
          {locale.checkIn}
          <input
            aria-labelledby="checkInLabel"
            id="checkIn"
            aria-required="false"
            type="date"
            className="w-full px-4 py-3 border border-black-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100"
            autoComplete="off"
            onChange={(event) => setCheckIn(event.target.value)}
            value={checkIn}
            min={new Date().toISOString().split('T')[0]}
            max={
              new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]
            }
          />
        </label>

        <label htmlFor="checkOut" className="block text-sm text-black-60 mb-1" id="checkOutLabel">
          {locale.checkOut}

          <input
            aria-labelledby="checkOutLabel"
            id="checkOut"
            aria-required="false"
            type="date"
            className="w-full px-4 py-3 border border-black-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100"
            autoComplete="off"
            onChange={(event) => setCheckOut(event.target.value)}
            value={checkOut}
            min={new Date().toISOString().split('T')[0]}
            max={
              new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]
            }
          />
        </label>

        <Dropdown
          id="guests"
          label={locale.guests}
          ariaLabel={locale.guests}
          placeholder={locale.guests}
          options={[
            { value: '1', label: locale['guestOptions.one'] },
            { value: '2', label: locale['guestOptions.two'] },
            { value: '3', label: locale['guestOptions.three'] },
            { value: '4', label: locale['guestOptions.four'] }
          ]}
          value={guests}
          setValue={setGuests}
          inputClassName="w-full px-4 py-3 bg-white border border-black-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100"
        />
      </div>

      <button
        type="button"
        className="w-full py-3 bg-green-100 text-white rounded-lg font-medium hover:bg-green-80 transition-colors mb-4"
        onClick={() => setShowModal(true)}
      >
        {locale.reserveNow}
      </button>

      <p className="text-center text-sm text-black-50">{locale.freeCancellation}</p>

      <div className="mt-6 pt-6 border-t border-black-10">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-black-60">
            {price} {locale.nights.replace('{nights}', '3')}
          </span>
          <span className="text-black-100">{pricePerNight}</span>
        </div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-black-60">{locale.cleaningFee}</span>
          <span className="text-black-100">{locale.cleaningFeeValue}</span>
        </div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-black-60">{locale.serviceFee}</span>
          <span className="text-black-100">{locale.serviceFeeValue}</span>
        </div>
        <div className="flex items-center justify-between font-semibold pt-2 border-t border-black-10 mt-2">
          <span className="text-black-100">{locale.total}</span>
          <span className="text-black-100">{formatPrice(total)}</span>
        </div>
      </div>

      <Modal
        visible={showModal}
        setVisible={setShowModal}
        titleText={locale['booknow.title']}
        bodyText={locale['booknow.description']}
        confirmButton={{
          text: locale['booknow.confirm'],
          handler: () => {
            if (checkIn && checkOut && guests) {
              setCheckIn('');
              setCheckOut('');
              setGuests('');
              setSnackBarMessage(locale['booknow.success']);
              setSnackBarType('success');
            } else {
              setSnackBarMessage(locale['booknow.error']);
              setSnackBarType('error');
            }
            setShowModal(false);
          }
        }}
        cancelButton={{
          text: locale['booknow.cancel'],
          handler: () => setShowModal(false)
        }}
      />
      {snackBarMessage && <Snackbar message={snackBarMessage} type={snackBarType} />}
    </div>
  );
}
