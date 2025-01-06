import { ethers } from "ethers";
import { DefaultChainID } from "../config/constants";

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
 * @param {number} decimals
 * @param {number} decimalsToDisplay
 *
 * @returns {string}
 */
export const parseBalance = (balance: any, decimals = 18, decimalsToDisplay = 3) =>
  Number(ethers.formatUnits(balance, decimals)).toFixed(
    decimalsToDisplay
  );

export const numberWithCommas = (x: any) => {
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

export function toWei(ether: string | number) {
  return ethers.parseEther(String(ether));
}

export function toEth(ether: bigint | string) {
  return ethers.formatEther(ether);
}

export function isSameAddress(addr1: string, addr2: string) {
  return (
    ethers.isAddress(addr1) &&
    ethers.isAddress(addr2) &&
    addr1?.toLowerCase() === addr2?.toLowerCase()
  );
}

export function getBigNumber(value: string | number) {
  return BigInt(String(value));
}

export function formatPrice(price: bigint) {
  return `${nFormatter(Number(toEth(price)), 4)}`;
}

export function formatPriceUsd(price: bigint, usd: number) {
  return `${nFormatter(parseFloat(toEth(price)) * usd, 4)}`;
}

export function getEtherScanLink(data: string, type: "transaction" | "token" | "address") {
  const prefix =
    DefaultChainID == 4
      ? `https://rinkeby.etherscan.io`
      : `https://etherscan.io`;

  switch (type) {
    case "transaction": {
      return `${prefix}/tx/${data}`;
    }
    case "token": {
      return `${prefix}/token/${data}`;
    }
    case "address":
    default: {
      return `${prefix}/address/${data}`;
    }
  }
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
