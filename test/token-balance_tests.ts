import { ethers } from 'hardhat'
import { Contract } from 'ethers'
import chai from 'chai'
import { solidity } from "ethereum-waffle"
import { BigNumber } from 'ethers'
import { TokenBalance } from '../typechain/TokenBalance'
import { ICHIPowah } from '../typechain/ICHIPowah'
import { ICHIWalletPowahFixture, ichiPowahFixture } from '../lib/fixtures'
import { abi } from '@openzeppelin/contracts/build/contracts/IERC20.json'

chai.use(solidity);
const { expect } = chai;

describe('ICHI_Wallet_Powah', () => {
    let ICHIWalletFixture: TokenBalance
    let ICHIToken: Contract
    let ICHILegacyToken: Contract
    let ICHIPowahFixture: ICHIPowah
    let ICHIWallet: string
    let ICHITokenAddress: string
    let ICHILegacyAddress: string
    let Decimals8TokenAddress: string
    let Decimals8Wallet: string
    let Decimals8Token: Contract
    const hundred = BigNumber.from(100)
    const null_bytes = ethers.constants.HashZero

    beforeEach(async () => {
        
        // 1
        const [deployer] = await ethers.getSigners();

        // 2
        ICHIWalletFixture = (await ICHIWalletPowahFixture()).ICHIWalletFixture;
        ICHITokenAddress = (await ICHIWalletPowahFixture()).ICHI;
        ICHILegacyAddress = (await ICHIWalletPowahFixture()).ICHILegacy;
        ICHIWallet = (await ICHIWalletPowahFixture()).ICHIWallet;
        Decimals8TokenAddress = (await ICHIWalletPowahFixture()).Decimals8Token;
        Decimals8Wallet = (await ICHIWalletPowahFixture()).Decimals8Wallet;

        // 3
        ICHIPowahFixture = (await ichiPowahFixture()).fixture;
        ICHIToken = new Contract(ICHITokenAddress, abi, deployer);
        ICHILegacyToken = new Contract(ICHILegacyAddress, abi, deployer);
        Decimals8Token = new Contract(Decimals8TokenAddress, abi, deployer);
    })

    describe('Return Values', async() => {
        it('Number of constituency should be 1', async() => {
            //can really only test this for forks on mainnet
            await ICHIPowahFixture.insertConstituency(ICHILegacyAddress,ICHIWalletFixture.address,hundred, null_bytes)
            const count = await ICHIPowahFixture.constituencyCount()
            expect(count.toNumber() >= 1).to.be.true;
        })
        it('Check constituency added', async() => {
            await ICHIPowahFixture.insertConstituency(ICHILegacyAddress,ICHIWalletFixture.address,hundred, null_bytes)
            let constituency = await ICHIPowahFixture.constituencyAtIndex((await ICHIPowahFixture.constituencyCount()).toNumber() - 1)
            expect(constituency == ICHILegacyAddress).to.be.true;

            await ICHIPowahFixture.insertConstituency(ICHITokenAddress,ICHIWalletFixture.address,hundred, null_bytes)
            constituency =  await ICHIPowahFixture.constituencyAtIndex((await ICHIPowahFixture.constituencyCount()).toNumber() - 1)
            expect(constituency == ICHITokenAddress).to.be.true;
        })
        it('getSupply should be > 1', async() => {
            let supply = await ICHIWalletFixture.getSupply(ICHILegacyAddress)
            expect(supply.gt(0)).to.be.true;

            supply = await ICHIWalletFixture.getSupply(ICHITokenAddress)
            expect(supply.gt(0)).to.be.true;
        })
        it('getPowah should produce accurate value for 8 decimals', async() => {
            let calculated_powah = await ICHIWalletFixture.getPowah(Decimals8TokenAddress, Decimals8Wallet, null_bytes)
            let expected_powah = await Decimals8Token.balanceOf(Decimals8Wallet);
            
            expect(calculated_powah.eq(expected_powah.mul(1e1))).to.be.true;
        })
        it('getPowah should produce accurate value for 9 decimals', async() => {
            let calculated_powah = await ICHIWalletFixture.getPowah(ICHILegacyAddress, ICHIWallet, null_bytes)
            let expected_powah = await ICHILegacyToken.balanceOf(ICHIWallet);
            
            expect(calculated_powah.eq(expected_powah)).to.be.true;
        })
        it('getPowah should produce accurate value for 18 decimals', async() => {
            let calculated_powah = await ICHIWalletFixture.getPowah(ICHITokenAddress, ICHIWallet, null_bytes)
            let expected_powah = await ICHIToken.balanceOf(ICHIWallet);

            expect(calculated_powah.eq(expected_powah.div(1e9))).to.be.true;
        })
    })
})