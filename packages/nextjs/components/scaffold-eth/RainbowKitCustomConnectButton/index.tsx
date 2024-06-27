"use client";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
import React, { useCallback } from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';
import { AddressInfoDropdown } from './AddressInfoDropdown';
// import { base } from 'viem/chains';
// import { OnchainKitProvider } from '@coinbase/onchainkit';
// import { Avatar, Identity, Name, Badge, Address } from '@coinbase/onchainkit/identity';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
// import { WagmiProvider } from 'wagmi'; 
// import { wagmiConfig } from '../../../services/web3/wagmiConfig'; 
// import { ReactNode } from 'react'; 

// type Props = { children: ReactNode };
 
// const queryClient = new QueryClient(); 

// const EAS_SCHEMA_ID = '0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9';

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
      {account.address ? (<><AddressInfoDropdown address={account.address} blockExplorerAddressLink={undefined} displayName={''} />
      
     
      {/* <Identity
        address={account.address}
        schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
      >
        <Avatar />
        <Name>
          <Badge/>
        </Name>
        <Address />
      </Identity> */}
   
   
      </>) : (
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
      }  </>);
}
