# ICHI Governance

[ICHI](https://app.ichi.org/) is an open-source DeFi protocol which enables protocol-owned liquidity and efficient liquidity management for the web3 space. DeFi users are incentivized to become members of the ICHI community and shape it's evolution by voting on proposals. 

This repository specifies ICHI protocol's governance structure. Notably, ICHI follows proof-of-stake style voting, i.e, your voting power (ICHI Powah) is determined by the size of your investment in the system. As of now, we compute a user's stake using their participation across - 

 1. [xICHI](https://etherscan.io/tx/0xa08579b0a5768740524ed0f87edc606ecff7265b826403ccd41add93897f2272)  
 2. [ICHI-1INCH](https://etherscan.io/tx/0x4886acb6154e8896039eefa7a6dbed8c31c8b13839bb629785149692aa62a417)  
 3. [ICHI-ETH Sushi](https://etherscan.io/tx/0x587f4bbe20ccd357c03b6ec6f75c671b787112dc12221bd4d910d24aa171a09c)   
 4. [ICHI-ETH 80/20 Balancer](https://etherscan.io/tx/0x8a73f6130f6fcc21e2fc13b004e45354ac0959eae123e94e01c1a6bca1fe5ee1) 
 5. [ICHI-LINK](https://etherscan.io/tx/0x494aff2dd887b62098d276d5a2a0ba2241fc9fc1c43cba3fb9535ef8551d4927) 
 6. [ICHI-ETH Uni](https://etherscan.io/tx/0x6076ee7b84ae157cd22197c158f0100096d06e6903c4e35bbaf3d65dde351e07) 
 7. [ICHI-BNT LP Insurance](https://etherscan.io/tx/0xfaa3a4ad453f60f56cf747a1b0df635f2e542a4cc1f948c196ad9bd4ab650452)  
 8. ICHI-BNT AngelVault

As more partnerships and products are announced, we will be adding them here as well. 

## Technical Overview 

The different liquidity pools/products mentioned above are referred to as **constituencies** in our system.  Every user is registered in a set of constituencies - i.e the ICHI offerings/LP tokens they have chosen to use. 

## ICHI Powah Contract 

This [contract](ICHIPowah%20-%20https://etherscan.io/address/0x873902a3c0731ecc1f2075435fe035acceed5459) stores metadata about each constituency is stored in a solidity struct. The struct - 

 - Specifies which interpreter is acting on it
 - the weight the constituency has in the governance
 - Other information

In keeping with CRUD, we then define a set of all the available constituencies. Each item in the set specifies a constituency and holds an array of addresses of users invested in it. There is also an option to store additional data. 

The contract implements two important functions - 

### balanceOf() 

We go through all the constituencies available, and make an instance of each. We then check how much voting power a user has in that constituency. By the time the contract has iterated over all the constituencies, we can return the total voting power a user has in ICHI. 

### totalSupply() 

We iterate over all the constituencies, making an instance for each, and then check how many possible votes there are in each. We need this metric to standardize the votes across different constituencies - basically following the unitary method. 

##  Interpreter Contract 

This is a contract template that that implements ISatelite and acts as the medium between ICHIPowah and individual constituencies for communicating user data. Each contract implements two functions - 

 - getPowah() 
 - getSupply()
    
 ### Available Interpreters
 

 1. [xICHI](https://etherscan.io/address/0x65e1a3555f2c544f84c97a385cc1dbe69da5ee6c)
 2. [1INCH-ICHI Liquidity](https://etherscan.io/address/0x9f493813d4ea0328d263bdcd8d486e914ec5ebc8)
 3. [ICHI-ETH Sushi Farm](https://etherscan.io/address/0x822b94df15fe9c60b35796be7b1e5e15ee225dd3)
 4. [ICHI LP in ICHI Farm](https://etherscan.io/address/0x7c49fc7110ef49d080f1d0cfc57fad5f21515014)
 5. [ICHI in Bancor LP](https://etherscan.io/address/0x43f1cacdacd3fa65dbcbd56604b90e077fffbb83)
 6. ICHI in Bancor V3
