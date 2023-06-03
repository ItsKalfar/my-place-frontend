// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Zether is ERC20 {
    constructor(uint256 initialSupply) ERC20("Zether", "ZTH") {
        _mint(msg.sender, initialSupply);
    }
}