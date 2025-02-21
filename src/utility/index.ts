import { ethers } from "ethers";

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function formatBalance(amount: bigint): string {
  return `${ethers.formatEther(amount)} ETH`;
}
