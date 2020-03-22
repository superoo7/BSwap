pragma solidity ^0.5.1;

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "./WrappedToken.sol";

// 4 decimal since Hive lowest amount is 0.001
contract Hive is WrappedToken, ERC20Detailed("Hive Pegged", "HIVEP", 4) {}
