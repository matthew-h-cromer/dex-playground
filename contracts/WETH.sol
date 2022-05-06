// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

contract WETH is ERC20 {
    constructor(uint256 initialSupply) ERC20("Wrapped ETH", "WETH") {
        _mint(msg.sender, initialSupply);
    }
}
