# ichi-governance

ICHIPowah - https://etherscan.io/address/0x873902a3c0731ecc1f2075435fe035acceed5459

### Explanation 

Each constituency refers to different liquidity pools/products eg. Bancor XiCHi etc.
Every user is registered in a set of constituencies
	- i.e the ICHI offerings/LP tokens they have chosen to use
IN ICHIPOWAH MAIN CONTRACT
We define a struct for each constit
	- Specifies which interpreter* is acting on it
	- the weight the constit overall has in the governance
	- Other information
We have a constituency set - containing
	- A constit
	- Address of users registered in each constit
	- Other data
In balanceOf function -
	we go through all the constits, make an instance of each, and then check how much voting power
	a user has in that constituency
	we then return the total voting power a user has in all the constituencies put together
In totalSupply function -
	we go through all the constituencies, make an instance for each, check how many possible votes
	there are in each constit
* An interpreter is a contract that implements ISatelite and acts as the medium between for communicating user data
  between ICHIPowah and individual constituencies. Imp methods - getPowah and getSupply
INTERPRETER CONTRACT (*TOKEN*POWAH) Implements aboce mentioned functions
	- getSupply function
		
	Uses the total balance of voting tokens available in a constituency (ref as Instance)
	Returns the number of tokens, multiplied by "weight" available to each token - to a uniform degree of precision
	This way, no matter what token you have // constituency you come from - you end up with the same "voting unit"
	
	- getPowah function
		
	Returns the total voting power of an agent, in the context of the constutency they are in
	
	Eg. If a user is staking on the ICHI yield farm on 1Inch Platform ...
	
	gets the user's ichi balance on that constituency, which is itself an ICHI product eg Angel Vault **
	gets the user balance of the LP token native to that Angel Vault
	For each LP token, the user gets as many votes as the ICHI underlying that vault
	Moreover, gets the balance of LP tokens the user may have staked in the 1inch ICHI farming contract
	For each of those, the user again gets as many votes as the ICHI tokens underlying that vault of origin
** An ICHI Angel vault implements the ERC-20 token standard, so it can be thought of as a token too

### Interperters
- xICHI https://etherscan.io/address/0x65e1a3555f2c544f84c97a385cc1dbe69da5ee6c
- 1INCH-ICHI Liquidity  https://etherscan.io/address/0x9f493813d4ea0328d263bdcd8d486e914ec5ebc8
- ICHI-ETH Sushi Farm https://etherscan.io/address/0x822b94df15fe9c60b35796be7b1e5e15ee225dd3
- ICHI LP in ICHI Farm https://etherscan.io/address/0x7c49fc7110ef49d080f1d0cfc57fad5f21515014
- ICHI in Bancor LP https://etherscan.io/address/0x43f1cacdacd3fa65dbcbd56604b90e077fffbb83

### LP and xICHI Addresses that earn votes

- xICHI - 0x70605a6457B0A8fBf1EEE896911895296eAB467E - https://etherscan.io/tx/0xa08579b0a5768740524ed0f87edc606ecff7265b826403ccd41add93897f2272
- ICHI-1INCH - 0x1dcE26F543E591c27717e25294AEbbF59AD9f3a5 - https://etherscan.io/tx/0x4886acb6154e8896039eefa7a6dbed8c31c8b13839bb629785149692aa62a417
- ICHI-ETH Sushi - 0x9cD028B1287803250B1e226F0180EB725428d069 - https://etherscan.io/tx/0x587f4bbe20ccd357c03b6ec6f75c671b787112dc12221bd4d910d24aa171a09c
- ICHI-ETH 80/20 Balancer - 0x58378f5F8Ca85144ebD8e1E5e2ad95B02D29d2BB - https://etherscan.io/tx/0x8a73f6130f6fcc21e2fc13b004e45354ac0959eae123e94e01c1a6bca1fe5ee1
- ICHI-LINK - 0x960c437E2A9A9a25e0FEDC0C8A5899827B10F63c - https://etherscan.io/tx/0x494aff2dd887b62098d276d5a2a0ba2241fc9fc1c43cba3fb9535ef8551d4927
- ICHI-ETH Uni - 0xd07D430Db20d2D7E0c4C11759256adBCC355B20C - https://etherscan.io/tx/0x6076ee7b84ae157cd22197c158f0100096d06e6903c4e35bbaf3d65dde351e07
- ICHI-BNT LP Insurance - 0x4a2F0Ca5E03B2cF81AebD936328CF2085037b63B - https://etherscan.io/tx/0xfaa3a4ad453f60f56cf747a1b0df635f2e542a4cc1f948c196ad9bd4ab650452


## Deprecated ICHIPowah Addresses

https://etherscan.io/address/0x06899B9092aB29aB197C1588b326B13812Ba8A9d - Deprecated 14 June 2021 [block](https://etherscan.io/block/12635192)
https://etherscan.io/address/0xD5b0A2a96907344A537Eb809A0B75b895492E2f8 - Deprecated 4 January 2021 [block](https://etherscan.io/block/11590591)
