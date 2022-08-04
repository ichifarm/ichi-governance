import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { ICHIFarmPowah } from '../typechain/ICHIFarmPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { ichiFarmPowahFixture, ichiPowahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('ICHI-Farm', () => {
    let ICHIFarmPowahFixture: ICHIFarmPowah
    let ICHIPowahFixture: ICHIPowah
    let poolid: string
    let ichiEthPoolID: string 
    let ichiLinkPoolID: string 
    let ichiEthUniPoolID: string 

    let ichiEthLP: string;
    let ichiEthWallet: string;
    let ichiLinkLP: string;
    let ichiLinkWallet: string;
    let ichiEthUniLP: string;
    let ichiEthUniWallet: string;

    const hundred = BigNumber.from(100)

    const ICHI_ETH_BALANCER_80_20 = ""
    const ICHI_LINK_BALANCER = ""
    const ICHI_ETH_UNI = ""

    beforeEach(async () => {
        
        // 1
        ICHIFarmPowahFixture = (await ichiFarmPowahFixture()).ichiFarmFixture
        poolid = (await ichiFarmPowahFixture()).ichiFarmPoolID
        ichiEthPoolID = (await ichiFarmPowahFixture()).ichiEthPoolID 
        ichiLinkPoolID = (await ichiFarmPowahFixture()).ichiLinkPoolID 
        ichiEthUniPoolID = (await ichiFarmPowahFixture()).ichiEthUniPoolID
    
        ichiEthLP = (await ichiFarmPowahFixture()).ichiEthLP
        ichiEthWallet = (await ichiFarmPowahFixture()).ichiEthWallet
        ichiLinkLP = (await ichiFarmPowahFixture()).ichiLinkLP
        ichiLinkWallet = (await ichiFarmPowahFixture()).ichiLinkWallet
        ichiEthUniLP = (await ichiFarmPowahFixture()).ichiEthUniLP
        ichiEthUniWallet = (await ichiFarmPowahFixture()).ichiEthUniWallet

        // 3 
        ICHIPowahFixture = (await ichiPowahFixture()).fixture

    })

    describe('Return Values', async() => {
        it('getSupply should be > 1 80/20 ICHI-ETH', async() => {
            await ICHIPowahFixture.insertConstituency(ICHIFarmPowahFixture.address,ichiEthLP,hundred, ichiEthPoolID)
            const supply = await ICHIFarmPowahFixture.getSupply(ichiEthLP)
            console.log(supply.toString())
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1 80/20 ICHI-ETH', async() => {
            const powah = await ICHIFarmPowahFixture.getPowah(ichiEthLP, ichiEthWallet, ichiEthPoolID)
            console.log(powah.toString())
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
        it('getSupply should be > 1 ICHI-LINK', async() => {
            await ICHIPowahFixture.insertConstituency(ICHIFarmPowahFixture.address,ichiLinkLP,hundred, ichiLinkPoolID)
            const supply = await ICHIFarmPowahFixture.getSupply(ichiLinkLP)
            console.log(supply.toString())
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1 ICHI-LINK', async() => {
            const powah = await ICHIFarmPowahFixture.getPowah(ichiLinkLP, ichiLinkWallet, ichiLinkPoolID)
            console.log(powah.toString())
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
        it('getSupply should be > 1 ICHI-ETH UNI', async() => {
            await ICHIPowahFixture.insertConstituency(ICHIFarmPowahFixture.address,ichiEthUniLP,hundred, ichiEthUniPoolID)
            const supply = await ICHIFarmPowahFixture.getSupply(ichiEthUniLP)
            console.log(supply.toString())
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1 ICHI-ETH UNI', async() => {
            const powah = await ICHIFarmPowahFixture.getPowah(ichiEthUniLP, ichiEthUniWallet, ichiEthUniPoolID)
            console.log(powah.toString())
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
    })
})