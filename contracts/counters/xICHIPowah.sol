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

contract xICHIPowah {
    using SafeMath for uint256;

    address public ICHIaddress = 0x903bEF1736CDdf2A537176cf3C64579C3867A881;
    address public xICHIaddress = 0x70605a6457B0A8fBf1EEE896911895296eAB467E;

    function totalSupply() public view returns (uint256 ichi) {
        IStake stake = IStake(xICHIaddress);
        IERC20 ichiToken = IERC20(ICHIaddress);

        ichi = ichiToken.balanceOf(address(stake));
    }

    function balanceOf(address owner) public view returns (uint256 ichi) {
        IStake stake = IStake(xICHIaddress);
        IERC20 ichiToken = IERC20(ICHIaddress);

        uint256 xICHI_totalICHI = ichiToken.balanceOf(address(stake));
        uint256 xICHI_balance = stake.balanceOf(owner);
        uint256 xICHI_total = stake.totalSupply();
    
        ichi = xICHI_totalICHI.mul(xICHI_balance).div(xICHI_total);
    }
}

