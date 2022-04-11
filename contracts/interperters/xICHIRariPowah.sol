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
    function totalSupply() external view returns (uint256);
}


contract xICHIRariPowah {
    using SafeMath for uint256;

    string public DESCRIPTION = "ICHIPowah Interperter for xichi tokens";

    address public ICHIaddress = 0x903bEF1736CDdf2A537176cf3C64579C3867A881; //mainnet
    address public XICHIaddress = 0x70605a6457B0A8fBf1EEE896911895296eAB467E; //mainnet

    function getSupply(address instance) public view returns (uint256 ichi) {
        IStake stake = IStake(instance);
        IERC20 ichiToken = IERC20(ICHIaddress);
        IERC20 xIchiToken = IERC20(XICHIaddress);


        uint256 xICHI_totalICHI = ichiToken.balanceOf(address(xIchiToken));
        uint256 rari_totalxICHI_balance = xIchiToken.balanceOf(address(stake));
        uint256 xICHI_total = xIchiToken.totalSupply();

        ichi = xICHI_totalICHI.mul(rari_totalxICHI_balance).div(xICHI_total); 
    }

    function getPowah(address instance, address user, bytes32 /*params*/) public view returns (uint256 ichi) {
        IStake stake = IStake(instance);
        IERC20 ichiToken = IERC20(ICHIaddress);
        IERC20 xIchiToken = IERC20(XICHIaddress);

        //Rari xICHI
        uint256 xICHI_totalICHI = ichiToken.balanceOf(xIchiToken);
        uint256 rari_xICHI_balance = stake.balanceOfUnderlying(user);
        uint256 xICHI_total = xIchiToken.totalSupply();
        
        ichi = xICHI_totalICHI.mul(rari_xICHI_balance).div(xICHI_total); 
    }
}

