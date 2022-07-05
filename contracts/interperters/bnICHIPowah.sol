// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface IStake {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract bnICHIPowah {
    using SafeMath for uint256;

    string public DESCRIPTION = "ICHIPowah Interperter for Bancor ICHI tokens";

    address public BancorICHIAddress = 0x36FAbE4cAeF8c190550b6f93c306A5644E7dCef6; //bancor pool address

    function getSupply(address instance) public view returns (uint256 bnIchi) {
        IStake bnIchiTokenStake = IStake(instance);
        bnIchi = bnIchiTokenStake.totalSupply();
    }

    function getPowah(address instance, address user, bytes32 /*params*/) public view returns (uint256 bnIchi) {
        IERC20 bnIchiToken = IERC20(instance);
        bnIchi = bnIchiToken.balanceOf(user);
    }
}

