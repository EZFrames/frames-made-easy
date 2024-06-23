"use client";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
import React, { useCallback } from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
import { AddressInfoDropdown } from './AddressInfoDropdown';
 
const buttonStyles = {
  background: 'transparent',
  border: '1px solid transparent',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 200,
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  fontSize: 18,
  backgroundColor: '#0052FF',
  paddingLeft: 15,
  paddingRight: 30,
  borderRadius: 10,
};
 
export function RainbowKitCustomConnectButton() {
  const { disconnect } = useDisconnect()
  const { connectors, connect, data } = useConnect();
  const account = useAccount()
  const createWallet = useCallback(() => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === 'coinbaseWalletSDK'
    );
    if (coinbaseWalletConnector) {
      connect({ connector: coinbaseWalletConnector });
    }
    console.log(account);
  }, [connectors, connect]);
  return (
    <>
      {account.address ? (<><AddressInfoDropdown address={account.address} blockExplorerAddressLink={undefined} displayName={''}/></>) : (
        <button style={{
          background: 'transparent',
          border: '1px solid transparent',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 200,
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          fontSize: 18,
          backgroundColor: '#0052FF',
          paddingLeft: 15,
          paddingRight: 30,

          borderRadius: 10,
        }} onClick={createWallet}>
          <CoinbaseWalletLogo />
          Create Wallet
        </button>)
      }  </>   );
}

