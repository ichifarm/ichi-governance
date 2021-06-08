// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;

import "./SafeMath.sol";

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

interface IPair {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function getReserves() external view returns (uint112, uint112, uint32);
}

interface IStake {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

interface IFarm {
    function userInfo(uint256 nr, address who) external view returns (uint256, uint256);
    function pendingIchi(uint256 nr, address who) external view returns (uint256);
    function pendingBonusIchi(uint256 _poolID, address _user) external view returns (uint256);
}

contract ICHIPOWAH {
  using SafeMath for uint256;

  address public admin;

  IFarm public ICHIFarm;

  struct ICHIPowahItem {
    address a;
    bool active;
    int8 multiplier;
  }

  mapping (address => ICHIPowahItem ) public pairs;
  mapping (address => ICHIPowahItem ) public LProviders;
  mapping (address => ICHIPowahItem ) public stakedTokens;

  event AddPair(address indexed pair);
  event AddLProvider(address indexed LProvider);
  event AddStaked(address indexed stakedToken);
  
  function name() public pure returns(string memory) { return "ICHIPOWAH"; }
  function symbol() public pure returns(string memory) { return "ICHIPOWAH"; }
  function decimals() public pure returns(uint8) { return 9; }  

  constructor(address admin_, address farm_) {
    admin= admin_;
    ICHIFarm = IFarm(farm_);
  }

  /* addPair - adds traditional Liquidity Pairs that implement getReserves()
  *
  */
  function addPair(address pair_, uint8 multlipler ) public {
    require(msg.sender == admin, "ICHIPowah::addPair: Call must come from admin");
    require(pairs[pair_] != true, "ICHIPowah::addPair: Pair already active");
    pairs[pair_] = true;

    emit AddPair(pair_);
  }

  /* addProviders - adds contract that implements special getReserves() function for the Liqudidity
  *
  */
  function addProviders(address LProvider_) public {
    require(msg.sender == admin, "ICHIPowah::addLProvider: Call must come from admin");
    require(LProviders[LProvider_] != true, "ICHIPowah::addLProvider: LProvider already active");
    LProviders[LProvider_] = true;

    emit AddLProvider(LProvider_);
  }

  /* addStakedToken - adds staked tokens to count for ICHI Powah
  *
  */
  function addStakedToken(address stakedToken_) public {
    require(msg.sender == admin, "ICHIPowah::addStakedToken: Call must come from admin");
    require(stakedTokens[stakedToken_] != true, "ICHIPowah::addStakedToken: Staked Token already active");
    stakedTokens[stakedToken_] = true;

    emit AddStaked(stakedToken_);
  }

  function totalSupply() public view returns (uint256) {
    IPair ichiETH = IPair(0x4EA9c6793C4931F25D0d08dd5Fe357Acb54814Ba);
    IPair ichiOneETH = IPair(0x856910d60689AD844f2A96fcE5e0B8d4caF52188);
    IPair ichiOneBTC = IPair(0x643E04f64326d4FF4596B977E4131deC317a7249);

    IStake stake = IStake(0x70605a6457B0A8fBf1EEE896911895296eAB467E);
    IERC20 ichi = IERC20(0x903bEF1736CDdf2A537176cf3C64579C3867A881);
    
    (uint256 ichi1, , ) = ichiOneBTC.getReserves();
    (uint256 ichi2, , ) = ichiOneETH.getReserves();
    (uint256 ichi3, , ) = ichiETH.getReserves();

    uint256 lp_totalIchi = ichi1.add(ichi2).add(ichi3);

    uint256 xIchi_totalIchi = ichi.balanceOf(address(stake));

    return lp_totalIchi.mul(2).add(xIchi_totalIchi);
  }

  function getLpPowah(uint256 pid, IERC20 ichi, IPair pair, IFarm farm, address owner) public view returns (uint256) {
    uint256 lp_totalIchi = ichi.balanceOf(address(pair));
    uint256 lp_total = pair.totalSupply();
    uint256 lp_balance = pair.balanceOf(owner);

    // Add staked balance
    (uint256 lp_stakedBalance, ) = farm.userInfo(pid, owner);
    lp_balance = lp_balance.add(lp_stakedBalance);
    
    // LP voting power is 2x the users ICHI share in the pool.
    uint256 lp_powah = lp_totalIchi.mul(lp_balance).div(lp_total).mul(2);

    return lp_powah;
  }

  function getStakedPowah() public view returns (uint256 staked_powah) {

  }

  function balanceOf(address owner) public view returns (uint256) {


    IPair ichiETH = IPair(0x4EA9c6793C4931F25D0d08dd5Fe357Acb54814Ba);
    IPair ichiOneETH = IPair(0x856910d60689AD844f2A96fcE5e0B8d4caF52188);
    IPair ichiOneBTC = IPair(0x643E04f64326d4FF4596B977E4131deC317a7249);

    IStake stake = IStake(0x70605a6457B0A8fBf1EEE896911895296eAB467E);
    IERC20 ichi = IERC20(0x903bEF1736CDdf2A537176cf3C64579C3867A881);

    uint256 one_lp_powah = getLpPowah(1, ichi, ichiETH, farm, owner);
    uint256 two_lp_powah = getLpPowah(2, ichi, ichiOneETH, farm, owner);
    uint256 three_lp_powah = getLpPowah(3, ichi, ichiOneBTC, farm, owner);

    uint256 xIchi_totalIchi = ichi.balanceOf(address(stake));
    uint256 xIchi_balance = stake.balanceOf(owner);
    uint256 xIchi_total = stake.totalSupply();
    
    // xICHI voting power is the users ICHI share in the stake
    uint256 xIchi_powah = xIchi_totalIchi.mul(xIchi_balance).div(xIchi_total);
    
    uint256 lp_powah = one_lp_powah.add(two_lp_powah).add(three_lp_powah);

    return lp_powah.add(xIchi_powah);
  }

  function allowance(address, address) public pure returns (uint256) { return 0; }
  function transfer(address, uint256) public pure returns (bool) { return false; }
  function approve(address, uint256) public pure returns (bool) { return false; }
  function transferFrom(address, address, uint256) public pure returns (bool) { return false; }
}