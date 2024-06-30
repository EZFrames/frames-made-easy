// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
//https://sepolia.basescan.org/address/0x059ee9bde2aff94d0e6ad396ec0ec7d27bff6dc8 
contract MyToken is ERC20, Ownable, ERC20Permit {
    constructor(address initialOwner)
        ERC20("USDC", "USDC")
        Ownable(initialOwner)
        ERC20Permit("MyToken")
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    function trf(address seller, uint256 amount, uint256 qt) public {
        uint256 tamount = qt*amount;
        _transfer(msg.sender, seller, tamount);
    }
    
}
