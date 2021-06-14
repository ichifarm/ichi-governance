import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { SushiICHIPowah } from '../typechain/SushiICHIPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { powahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('ICHI-ETH-Sushi', () => {
    let ICHIethSushi: SushiICHIPowah
    let fixture: ICHIPowah
    const ETH_ICHI_Address = "0x9cD028B1287803250B1e226F0180EB725428d069"
    const hundred = BigNumber.from(100)
    const null_bytes = ethers.constants.HashZero
   // const poolid = ethers.utils.formatBytes32String('4')
    const poolid = "0x0000000000000000000000000000000000000000000000000000000000000004"

    beforeEach(async () => {
        
        // 1
        const [deployer, user] = await ethers.getSigners()

        // 2
        const sushiICHIPowahFactory = await ethers.getContractFactory('sushiICHIPowah')
        ICHIethSushi = (await sushiICHIPowahFactory.deploy()) as SushiICHIPowah
        await ICHIethSushi.deployed()

        // 3 
        fixture = (await powahFixture()).fixture

    })

    describe('Return Values', async() => {
        it('Number of constituency should be 1', async() => {
            //can really only test this for forks on mainnet
            await fixture.insertConstituency(ICHIethSushi.address,ETH_ICHI_Address,hundred, poolid)
            const count = await fixture.constituencyCount()
            expect(count.toNumber()).to.equal(1)
        })
        it('getSupply should be > 1', async() => {
            const supply = await ICHIethSushi.getSupply(ETH_ICHI_Address)
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1', async() => {
            const wallet = "0x8f02319f577e17a71864b78dfbd50c55acbedede"
            const powah = await ICHIethSushi.getPowah(ETH_ICHI_Address, wallet, poolid)
            console.log(powah.toString())
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
    })
})