import { ethers } from 'hardhat'
import chai from 'chai'
import { solidity } from 'ethereum-waffle'
import { BigNumber } from 'ethers'
import { OneINCHICHIPowah } from '../typechain/oneINCHICHIPowah'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { powahFixture } from '../lib/fixtures'


chai.use(solidity);
const { expect } = chai;

describe('1INCH-ICHI', () => {
    let OneINCHICHIPowah: OneINCHICHIPowah
    let fixture: ICHIPowah
    const oneINCH_ICHI_Address = "0x1dcE26F543E591c27717e25294AEbbF59AD9f3a5"
    const hundred = BigNumber.from(100)
    const null_bytes = ethers.constants.HashZero

    beforeEach(async () => {
        
        // 1
        const [deployer, user] = await ethers.getSigners()

        // 2
        const OneINCHICHIPowahFactory = await ethers.getContractFactory('oneINCHICHIPowah')
        OneINCHICHIPowah = (await OneINCHICHIPowahFactory.deploy()) as OneINCHICHIPowah
        await OneINCHICHIPowah.deployed()

        // 3 
        fixture = (await powahFixture()).fixture

    })

    describe('Return Values', async() => {
        it('Number of constituency should be 1', async() => {
            //can really only test this for forks on mainnet
            await fixture.insertConstituency(OneINCHICHIPowah.address,oneINCH_ICHI_Address,hundred, null_bytes)
            const count = await fixture.constituencyCount()
            expect(count.toNumber()).to.equal(1)
        })
        it('getSupply should be > 1', async() => {
            const supply = await OneINCHICHIPowah.getSupply(oneINCH_ICHI_Address)
            expect(supply.isNegative()).to.equal(false)
            expect(supply.isZero()).to.equal(false)
        })
        it('getPowah shoud be > 1', async() => {
            const wallet = "0x11111D16485aa71D2f2BfFBD294DCACbaE79c1d4"
            const powah = await OneINCHICHIPowah.getPowah(oneINCH_ICHI_Address, wallet, null_bytes)
            expect(powah.isNegative()).to.equal(false)
            expect(powah.isZero()).to.equal(false)
        })
    })
})