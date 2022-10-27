import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { OneINCHICHIPowah } from '../typechain/oneINCHICHIPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { oneINCHICHIPowahFixture, ichiPowahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('1INCH-ICHI', () => {
    let OneINCHICHIPowahFixture: OneINCHICHIPowah
    let ICHIPowahFixture: ICHIPowah
    let oneINCHICHIWallet: string
    let oneINCHICHIAddress: string
    const hundred = BigNumber.from(100)
    const null_bytes = ethers.constants.HashZero

    beforeEach(async () => {
        
        // 1
        OneINCHICHIPowahFixture = await (await oneINCHICHIPowahFixture()).oneINCHICHIFixture
        oneINCHICHIWallet = await (await oneINCHICHIPowahFixture()).oneINCHICHIWallet
        oneINCHICHIAddress  = await (await oneINCHICHIPowahFixture()).oneINCHICHIAddress
        ICHIPowahFixture = (await ichiPowahFixture()).fixture
    })

    describe('Return Values', async() => {
        it('Number of constituency should be 1', async() => {
            //can really only test this for forks on mainnet
            await ICHIPowahFixture.insertConstituency(oneINCHICHIAddress,OneINCHICHIPowahFixture.address,hundred, null_bytes)
            const count = await ICHIPowahFixture.constituencyCount()
            expect(count.toNumber()).to.equal(1)
        })
        it('getSupply should be > 1', async() => {
            const supply = await OneINCHICHIPowahFixture.getSupply(oneINCHICHIAddress)
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1', async() => {
            const powah = await OneINCHICHIPowahFixture.getPowah(oneINCHICHIAddress, oneINCHICHIWallet, null_bytes)
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
    })
})