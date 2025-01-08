export const isZeroAddress = (address: string) => {
  return address === "0x0000000000000000000000000000000000000000";
};

export const shortenAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};
