import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { SushiICHIPowah } from '../typechain/SushiICHIPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { sushiICHIPowahFixture, ichiPowahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('ICHI-ETH-Sushi', () => {
    let ICHIethSushiFixture: SushiICHIPowah
    let ICHIPowahFixture: ICHIPowah
    let ETH_ICHI_Address: string
    let poolid: string
    let wallet: string 
    const hundred = BigNumber.from(100)
    const null_bytes = ethers.constants.HashZero

    beforeEach(async () => {
        
        // 1
        ICHIethSushiFixture = (await sushiICHIPowahFixture()).sushiICHIFixture
        ETH_ICHI_Address = (await sushiICHIPowahFixture()).ethICHIWallet
        poolid = (await sushiICHIPowahFixture()).sushiICHIPoolID
        wallet = (await sushiICHIPowahFixture()).sushiICHIWallet

        // 2 
        ICHIPowahFixture = (await ichiPowahFixture()).fixture

    })

    describe('Return Values', async() => {
        it('Number of constituency should be 1', async() => {
            //can really only test this for forks on mainnet
            await ICHIPowahFixture.insertConstituency(ETH_ICHI_Address,ICHIethSushiFixture.address,hundred, poolid)
            const count = await ICHIPowahFixture.constituencyCount()
            expect(count.toNumber()).to.equal(1)
        })
        it('getSupply should be > 1', async() => {
            const supply = await ICHIethSushiFixture.getSupply(ETH_ICHI_Address)
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1', async() => {
            const powah = await ICHIethSushiFixture.getPowah(ETH_ICHI_Address, wallet, poolid)
            console.log(powah.toString())
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
    })
})