<div align="center">
    <h1>🏗 Frames Builder</h1>
</div>
<br>
<div align="center">
    <a href="">App Demo Link</a> | <a href="https://my-on-chain-store.myshopify.com/">Example Shopify Store</a>
</div>
 <br>
<div align="center">
    Built for both <a href="https://onchain-summer.devfolio.co/">Onchain Buildathon</a> and <a href="https://eas-onchain-summer.devfolio.co/">Attestation Summer</a> 2024 for <a href="https://attest.org/">EAS</a> and <a href="https://www.base.org/">BASE</a> by a based team of <a href="https://buidlguidl.com/">BuidlGuidl</a> members
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
- onchain attestations for receipt data for transactions using EAS

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
- <a href="https://docs.attest.org/docs/developer-tools/eas-sdkv">EAS SDK</a>

## Contracts 

<b>payment contract address:</b> <a href="https://sepolia.basescan.org/address/0x059ee9bde2aff94d0e6ad396ec0ec7d27bff6dc8">0x059ee9bde2aff94d0e6ad396ec0ec7d27bff6dc8</a>

Handles the payment for a product in the transaction frames

<b>EAS schema contract address / UID:</b> <a href="https://base-sepolia.easscan.org/schema/view/0x9df58a994ebd1a1d5d35b6cc9a8e417d5cbc1d4d8cd94f1b3431f71793fb43da">0x9df58a994ebd1a1d5d35b6cc9a8e417d5cbc1d4d8cd94f1b3431f71793fb43da</a>

Schema that we have for users to 'attest' to the order receipt details onchain to share with customer in warpcast DM later

