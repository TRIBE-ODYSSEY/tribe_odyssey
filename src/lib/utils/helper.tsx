import { formatEther, parseEther, isAddress, isAddressEqual } from 'viem'

export function shortenHex(hex: string, length = 4) {
  if (!hex) return "";
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

/**
 * @name parseBalance
 *
 * @param {import("@ethersproject/bignumber").BigNumberish} balance
 * @param {number} decimalsToDisplay
 *
 * @returns {string}
 */
export const parseBalance = (balance: bigint, _decimals = 18, decimalsToDisplay = 3) =>
  Number(formatEther(balance)).toFixed(decimalsToDisplay);

export const numberWithCommas = (x: number | string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const nFormatter = (num: number, digits: number) => {
  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
};

export const toWei = (ether: string | number) => {
  return parseEther(String(ether));
};

export const toEth = (wei: bigint | string) => {
  return formatEther(typeof wei === 'string' ? BigInt(wei) : wei);
};

export const isSameAddress = (addr1: string, addr2: string) => {
  return isAddress(addr1) && isAddress(addr2) && isAddressEqual(addr1, addr2);
};

export function getBigNumber(value: string | number): bigint {
  return BigInt(String(value));
}

export function formatPrice(price: bigint): string {
  return `${nFormatter(Number(toEth(price)), 4)}`;
}

export function formatPriceUsd(price: bigint, usd: number): string {
  return `${nFormatter(parseFloat(toEth(price)) * usd, 4)}`;
}

export function downloadFile(link: string) {
  const element = document.createElement("a");
  const file = new Blob([link], { type: "image/*" });
  element.href = URL.createObjectURL(file);
  element.download = "image.jpg";
  element.click();
}

export function sortAndSetCategory(array: string[]) {
  const allTagsWithCount = array?.reduce((tagsWithCount: Record<string, number>, currentTag: string) => {
    tagsWithCount[currentTag] = (tagsWithCount[currentTag] || 0) + 1; // increment the number of counts of a tag
    return tagsWithCount;
  }, {});

  // sort the tag(key) according its count
  const sortedTagsArray = Object.keys(allTagsWithCount).sort(
    (a, b) => allTagsWithCount[b] - allTagsWithCount[a]
  );
  return sortedTagsArray;
}

export function ToText(node: string) {
  const tag = document.createElement("div");
  tag.innerHTML = node;
  node = tag.innerText;
  return node;
}

export function ShortenText(text: string, startingPoint: number, maxLength: number) {
  return text.length > maxLength ? text.slice(startingPoint, maxLength) : text;
}
