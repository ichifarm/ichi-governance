# ICHI Governance

[ICHI](https://app.ichi.org/) is an open-source DeFi protocol which enables protocol-owned liquidity and efficient liquidity management for the web3 space. DeFi users are incentivized to become members of the ICHI community and shape it's evolution by voting on proposals. 

This repository specifies ICHI protocol's governance structure. Notably, ICHI follows proof-of-stake style voting, i.e, your voting power (ICHI Powah) is determined by the size of your investment in the system. As of now, we compute a user's stake using their participation across - 

 1. [xICHI](https://etherscan.io/tx/0xa08579b0a5768740524ed0f87edc606ecff7265b826403ccd41add93897f2272)   
 2. [ICHI-ETH Sushi](https://etherscan.io/tx/0x9c0dd78fc9e347c8e67d34522804feab85f0e6c85e1ed90ee96921b214037012)    
 3. [ICHI-ETH Uni](https://etherscan.io/tx/0x9c0dd78fc9e347c8e67d34522804feab85f0e6c85e1ed90ee96921b214037012)   
 4. [ICHI-BNT LP V3](https://etherscan.io/tx/0x564cee1b70128e12807b8555d0aae38bad6473b6d93a408e47d1088b28db58fe)
 5. [ICHI Wallet Balance](https://etherscan.io/tx/0x1974bda475b778a5b620a9ac1c7fc19b85bf1bfcef64b24563af87e215f1e24a)
 6. [ICHI Legacy Wallet Balance](https://etherscan.io/tx/0x1974bda475b778a5b620a9ac1c7fc19b85bf1bfcef64b24563af87e215f1e24a)

As more partnerships and products are announced, we will be adding them here as well. 

## Quick Setup 

Ensure you add your infura env variable to pacakage.json at the following place - 

```
"ganache": "env-cmd -x ganache-cli -f https://mainnet.infura.io/v3/\\$INFURA_API_KEY --networkId * --allowUnlimitedContractSize --gasLimit 7989556 --gasPrice 100000000000 --mnemonic \"${MNEMONIC}\" ", 
```

And then sequentially execute - 

```
yarn install 
yarn compile 
yarn ganache 
yarn test
```

Do note that the Ganache CLI needs to be run in a separate CLI environment. 

## Technical Overview 

The different liquidity pools/products mentioned above are referred to as **constituencies** in our system.  Every user is registered in a set of constituencies - i.e the ICHI offerings/LP tokens they have chosen to use. 

## ICHI Powah Contract 

This [contract](ICHIPowah%20-%20https://etherscan.io/address/0x873902a3c0731ecc1f2075435fe035acceed5459) stores metadata about each constituency is stored in a solidity struct. The struct - 

    - Specifies which interpreter* is acting on it
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
 6. [ICHI in Bancor V3](https://etherscan.io/address/0x8C261C87288dd5E2dc462FA0fD4C6399a7F102eF)
 7. [ICHI Wallet](https://etherscan.io/address/0x134fb1b3B3519187a43bE9789E7aC5473CAEb01a)

 ### Legacy and retired contracts

https://etherscan.io/address/0x06899B9092aB29aB197C1588b326B13812Ba8A9d - Deprecated 14 June 2021 [block](https://etherscan.io/block/12635192)
https://etherscan.io/address/0xD5b0A2a96907344A537Eb809A0B75b895492E2f8 - Deprecated 4 January 2021 [block](https://etherscan.io/block/11590591)