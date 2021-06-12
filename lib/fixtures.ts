import { ethers } from 'hardhat'
import { ICHIPowah } from '../typechain/ICHIPowah'


interface PowahFixture {
    fixture: ICHIPowah
}

export async function powahFixture(): Promise<PowahFixture> {
    const ichiPowahFactory = await ethers.getContractFactory('ICHIPowah')
    const fixture = (await ichiPowahFactory.deploy()) as ICHIPowah
    return { fixture }
}

