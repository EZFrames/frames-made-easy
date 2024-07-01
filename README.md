<div align="center">
    <h1>🏗 Frames Builder</h1>
</div>
<br>
<div align="center">
    <a href="">App Demo Link</a> | <a href="https://my-on-chain-store.myshopify.com/">Example Shopify Store</a>
</div>
 <br>
<div align="center">
    Built for both Onchain and Attestation Summer by <a href="https://attest.org/">EAS</a> and <a href="https://www.base.org/">BASE</a> by an awesome team of <a href="">BuidlGuidl</a> members
</div>
<br>
<div align="center">
    <a href="https://github.com/bhavyagor12">bhavyagor12</a> | <a href="https://github.com/ishaan812">ishaan812</a> | <a href="https://github.com/kenilshahh">kenilshahh</a> | <a href="https://github.com/JollyRogerz">JollyRogerz</a> | <a href="https://github.com/tantodefi">tantodefi</a>
</div>
<br>

![Frames Builder](/public/img/image.png)

## Application Features

- easy no-code Farcaster Frames builder
- support for multiple kinds of frames
- support for product frames with built-in  support for transactions in USDC on BASE within frames
- shopify integration to facilitate GET-ing product information for frames via shopify ADMIN api (requires store url + API key)
- visual slideshow-like  editor UI

Creation of Frame Story:
Utilize the no-code frame builder provided by "hojayega" to allow users to easily create multi-page frames without the added complexity
Each step of the storyrepresents a frame, users here edit and customize look and feel according to their requirements.
Have a on the go preview to get a representation of the frame being created.

Removing Complexity for Frame Creation:
"hojayega" offers a simplified approach to creating frames by abstracting away the complexity of metadata-based HTML frames.
Users can focus on adding content and designing their frames using the no-code platform without worrying about intricate metadata tags.
The platform generates the necessary metadata behind the scenes, allowing users to create interactive and authenticated experiences seamlessly.

Shipping Frames to Warpcast:
Integrate the ability for users to directly ship their frames from the no-code builder to Warpcast, 
Upon completing the design of their story, users can seamlessly cast their frames to Warpcast from the dashboard.
The platform handles the generation of the necessary frame definitions and interactions with the Farcaster Hub for validation or additional data, enabling users to share their product stories with Warpcast users.

Tracking Analytics and Product Performance:
Dashboard keeps a track of all the stories created by the user. 
Emables us to leverage technologies like FARCASTER HUB to pull in data to showcase to the user on the fly for the particular story


## Technologies Used

- 🏗 <a href="https://scaffoldeth.io/">Scaffold-ETH 2</a>
- 🔵 <a href="https://www.coinbase.com/en-ca/wallet/smart-wallet">Coinbase Smart Wallet</a>
- <a href="https://www.mongodb.com/">mongoDB</a>
- <a href="https://www.shopify.com/">shopify</a> and their <a href="https://shopify.dev/docs/api">Admin API</a>
- <a href="https://docs.farcaster.xyz/learn/what-is-farcaster/frames">Farcaster Frames</a>


## Contracts 

<b>payment contract address:</b> <a href="https://sepolia.basescan.org/address/0x059ee9bde2aff94d0e6ad396ec0ec7d27bff6dc8">0x059ee9bde2aff94d0e6ad396ec0ec7d27bff6dc8</a>

Handles the payment for a product in the transaction frames

<b>EAS schema contract address / UID:</b> <a href="https://base-sepolia.easscan.org/schema/view/0x9df58a994ebd1a1d5d35b6cc9a8e417d5cbc1d4d8cd94f1b3431f71793fb43da">0x9df58a994ebd1a1d5d35b6cc9a8e417d5cbc1d4d8cd94f1b3431f71793fb43da</a>

Schema that we have for users to 'attest' to the order receipt details onchain to share with customer in warpcast DM later

<b>Based PunX contract address:</b>

Example NFT contract


### 🏗 Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

**What's next**:

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`
- Edit your smart contract test in: `packages/hardhat/test`. To run test use `yarn hardhat:test`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.