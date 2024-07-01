// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

//https://sepolia.basescan.org/address/0x059ee9bde2aff94d0e6ad396ec0ec7d27bff6dc8
contract FramifyFaucet is ERC20, Ownable, ERC20Permit {
	uint256 public constant MAX_MINT = 100 * 10 ** 18;

	constructor(
	) ERC20("USDC", "USDC") ERC20Permit("MyToken") {}

	event Purchased(
		address indexed seller,
		address indexed buyer,
		uint256 amount,
		uint256 qt
	);

	function mint(address to, uint256 amount) public {
		require(
			amount <= MAX_MINT,
			"You can request only 100 USDC tokens as of now"
		);
		_mint(to, amount*10**18);
	}

	function trf(address seller, uint256 amount, uint256 qt) public {
		uint256 tamount = qt * amount;
		_transfer(msg.sender, seller, tamount);
		emit Purchased(seller, msg.sender, amount, qt);
	}
}
