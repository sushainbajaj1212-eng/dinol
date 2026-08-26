/**
 * DINOL takes payment in ETH only, sent directly to the project wallet.
 *
 * SWAP POINT: change the receiving address here, or override it per
 * deployment with NEXT_PUBLIC_ETH_RECEIVER.
 */
export const ETH_RECEIVER =
  process.env.NEXT_PUBLIC_ETH_RECEIVER ||
  "0x625e4F4A344658efa0895F92776FE8BfdE943609";

export const CHAIN = {
  id: 1,
  name: "Ethereum mainnet",
  symbol: "ETH",
};

/** Fallback rate used only if the live price lookup fails. */
export const FALLBACK_ETH_USD = 3400;

export function usdToEth(usd: number, ethUsd: number) {
  if (!ethUsd || ethUsd <= 0) return 0;
  return usd / ethUsd;
}

export function formatEth(amount: number) {
  if (!amount) return "0";
  return amount.toFixed(amount < 0.01 ? 6 : 5);
}

/** EIP-681 payment URI, so wallet apps can parse the QR directly. */
export function paymentUri(amountEth: number) {
  const wei = BigInt(Math.round(amountEth * 1e18));
  return `ethereum:${ETH_RECEIVER}@${CHAIN.id}?value=${wei.toString()}`;
}

export function isTxHash(value: string) {
  return /^0x[a-fA-F0-9]{64}$/.test(value.trim());
}
