// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface IStake {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function balanceOfUnderlying(address account) external view returns (uint256);
}

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}


contract ichiRariPowah {
    using SafeMath for uint256;

    string public DESCRIPTION = "ICHIPowah Interperter for Rari ichi";

    address public ICHIaddress = 0x903bEF1736CDdf2A537176cf3C64579C3867A881; //mainnet

    function getSupply(address instance) public view returns (uint256 ichi) {
        IStake stake = IStake(instance);
        IERC20 ichiToken = IERC20(ICHIaddress);

        ichi = ichiToken.balanceOf(address(stake));
    }

    function getPowah(address instance, address user, bytes32 /*params*/) public view returns (uint256 ichi) {
        IStake stake = IStake(instance);
        
        //Rari ICHI
        ichi = stake.balanceOfUnderlying(user);
    }
}

