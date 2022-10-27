import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { ICHIBancorInsurance } from '../typechain/ICHIBancorInsurance'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { ichiBancorInsuranceFixture, ichiPowahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('ICHI-Bancor-Insurance', () => {
    let ICHIBancorInsurance: ICHIBancorInsurance
    let ICHIPowahFixture: ICHIPowah
    let poolid: string
    let LPToken: string
    let wallet: string

    const hundred = BigNumber.from(100)


    beforeEach(async () => {

        // 1
        ICHIBancorInsurance = (await ichiBancorInsuranceFixture()).ichiBancorFixture
        poolid = (await ichiBancorInsuranceFixture()).ichiBancorInsurancePoolID
        LPToken = (await ichiBancorInsuranceFixture()).ichiBancorInsuranceLP
        wallet = (await ichiBancorInsuranceFixture()).ichiBancorInsuranceWallet

        // 2 
        ICHIPowahFixture = (await ichiPowahFixture()).fixture

    })

    describe('Return Values', async() => {
        it('getSupply should be > 1 Bancor Insurance', async() => {
            await ICHIPowahFixture.insertConstituency(LPToken, ICHIBancorInsurance.address,hundred, poolid)
            const supply = await ICHIBancorInsurance.getSupply(LPToken)
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1 Bancor Insurance', async() => {
            const powah = await ICHIBancorInsurance.getPowah(LPToken, wallet, poolid)
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
    })
})