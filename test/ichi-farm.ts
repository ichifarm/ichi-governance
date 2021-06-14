import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { ICHIFarmPowah } from '../typechain/ICHIFarmPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { powahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('ICHI-Farm', () => {
    let ICHIFarmPowah: ICHIFarmPowah
    let fixture: ICHIPowah

    const hundred = BigNumber.from(100)
    const poolid = "0x0000000000000000000000000000000000000000000000000000000000000004"

    const ICHI_ETH_BALANCER_80_20 = ""
    const ICHI_LINK_BALANCER = ""
    const ICHI_ETH_UNI = ""

    beforeEach(async () => {
        
        // 1
        const [deployer, user] = await ethers.getSigners()

        // 2
        const ICHIFarmPowahFactory = await ethers.getContractFactory('ICHIFarmPowah')
        ICHIFarmPowah = (await ICHIFarmPowahFactory.deploy()) as ICHIFarmPowah
        await ICHIFarmPowah.deployed()

        // 3 
        fixture = (await powahFixture()).fixture

    })

    describe('Return Values', async() => {
        it('getSupply should be > 1 80/20 ICHI-ETH', async() => {
            const poolid = "0x0000000000000000000000000000000000000000000000000000000000000001"
            const LPToken = "0x58378f5F8Ca85144ebD8e1E5e2ad95B02D29d2BB"
            await fixture.insertConstituency(ICHIFarmPowah.address,LPToken,hundred, poolid)
            const supply = await ICHIFarmPowah.getSupply(LPToken)
            console.log(supply.toString())
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1 80/20 ICHI-ETH', async() => {
            const poolid = "0x0000000000000000000000000000000000000000000000000000000000000001"
            const LPToken = "0x58378f5F8Ca85144ebD8e1E5e2ad95B02D29d2BB"
            const wallet = "0x11111D16485aa71D2f2BfFBD294DCACbaE79c1d4"
            const powah = await ICHIFarmPowah.getPowah(LPToken, wallet, poolid)
            console.log(powah.toString())
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
        it('getSupply should be > 1 ICHI-LINK', async() => {
            const poolid = "0x0000000000000000000000000000000000000000000000000000000000000008"
            const LPToken = "0x960c437E2A9A9a25e0FEDC0C8A5899827B10F63c"
            await fixture.insertConstituency(ICHIFarmPowah.address,LPToken,hundred, poolid)
            const supply = await ICHIFarmPowah.getSupply(LPToken)
            console.log(supply.toString())
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1 ICHI-LINK', async() => {
            const poolid = "0x0000000000000000000000000000000000000000000000000000000000000008"
            const LPToken = "0x960c437E2A9A9a25e0FEDC0C8A5899827B10F63c"
            const wallet = "0x18Cc17a1EeD37C02A77B0B96b7890C7730E2a2CF"
            const powah = await ICHIFarmPowah.getPowah(LPToken, wallet, poolid)
            console.log(powah.toString())
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
        it('getSupply should be > 1 ICHI-ETH UNI', async() => {
            const poolid = "0x0000000000000000000000000000000000000000000000000000000000000005"
            const LPToken = "0xd07D430Db20d2D7E0c4C11759256adBCC355B20C"
            await fixture.insertConstituency(ICHIFarmPowah.address,LPToken,hundred, poolid)
            const supply = await ICHIFarmPowah.getSupply(LPToken)
            console.log(supply.toString())
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1 ICHI-ETH UNI', async() => {
            const poolid = "0x0000000000000000000000000000000000000000000000000000000000000005"
            const LPToken = "0xd07D430Db20d2D7E0c4C11759256adBCC355B20C"
            const wallet = "0xF1C5B7f8D467DE7Ef26eE3dFc6D15E8186e75f60"
            const powah = await ICHIFarmPowah.getPowah(LPToken, wallet, poolid)
            console.log(powah.toString())
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
    })
})