const formatPrice = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '');
  const numPrice = Number(numericValue);
  return numPrice.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
};
