// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

contract WETH is ERC20 {
    constructor() ERC20("Token0", "T0") {}

    function faucet(uint256 _amount) public {
        _mint(msg.sender, _amount);
    }
}
