import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { ICHIBancorInsurance } from '../typechain/ICHIBancorInsurance'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { powahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('ICHI-Bancor-Insurance', () => {
    let ICHIBancorInsurance: ICHIBancorInsurance
    let fixture: ICHIPowah

    const hundred = BigNumber.from(100)
    const poolid = "0x0000000000000000000000000000000000000000000000000000000000000000"

    const LPToken = '0x4a2F0Ca5E03B2cF81AebD936328CF2085037b63B'

    beforeEach(async () => {
        
        // 1
        const [deployer, user] = await ethers.getSigners()

        // 2
        const ICHIBancorInsuranceFactory = await ethers.getContractFactory('ICHIBancorInsurance')
        ICHIBancorInsurance = (await ICHIBancorInsuranceFactory.deploy()) as ICHIBancorInsurance
        await ICHIBancorInsurance.deployed()

        // 3 
        fixture = (await powahFixture()).fixture

    })

    describe('Return Values', async() => {
        it('getSupply should be > 1 Bancor Insurance', async() => {
            await fixture.insertConstituency(ICHIBancorInsurance.address,LPToken,hundred, poolid)
            const supply = await ICHIBancorInsurance.getSupply(LPToken)
            console.log(supply.toString())
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1 Bancor Insurance', async() => {
            const wallet = "0x2ecda5574e4ae1b257eb439bc9930fb3aebef53a"
            const powah = await ICHIBancorInsurance.getPowah(LPToken, wallet, poolid)
            console.log(powah.toString())
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
    })
})