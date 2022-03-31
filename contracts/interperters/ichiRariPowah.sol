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

interface IFarm {

}

contract ichiRariPowah {
    using SafeMath for uint256;

    string public DESCRIPTION = "ICHIPowah Interperter for Rari ichi and xichi tokens";

    address public ICHIaddress = 0x903bEF1736CDdf2A537176cf3C64579C3867A881; //mainnet
    address public ICHIRariFarmAddress = 0xaFf95ac1b0A78Bd8E4f1a2933E373c66CC89C0Ce; // Rari ICHI Farm
    address public xICHIRariFarmAddress = 0xb7Abc13dB4aeaEA90A17aE46291317Ef8554F076; // Rari xICHI Farm

    function getSupply(address instance) public view returns (uint256 ichi) {
        IStake stake = IStake(instance);
        IERC20 ichiToken = IERC20(ICHIaddress);

        ichi = ichiToken.balanceOf(address(stake));
    }

    function getPowah(address instance, address user, bytes32 params) public view returns (uint256 ichi) {
        IStake stake = IStake(instance);
        IERC20 ichiToken = IERC20(ICHIaddress);

        //Rari ICHI
        IStake  ICHIRariFA= IStake(ICHIRariFarmAddress);
        uint256 rari_ICHI_balance = ICHIRariFA.balanceOf(user);
        ichi = ichi.add(rari_ICHI_balance);

        //Rari xICHI
        IStake xICHIRariFA = IStake(xICHIRariFarmAddress);
        uint256 xICHI_totalICHI = ichiToken.balanceOf(address(stake));
        uint256 rari_xICHI_balance = xICHIRariFA.balanceOf(user);
        uint256 rari_xICHI_total = xICHIRariFA.totalSupply();
        
        uint256 xichi = xICHI_totalICHI.mul(rari_xICHI_balance).div(rari_xICHI_total);
        ichi = ichi.add(xichi);
    }

