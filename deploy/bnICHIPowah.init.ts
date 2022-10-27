import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'
import { getChainId } from 'hardhat'


const bnICHIPowah: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployer} = await hre.getNamedAccounts()
  const {deploy} = hre.deployments;
  const chainId = await getChainId()
  
await deploy('bnICHIPowah', {
    from: deployer,
    log: true,
    }) 
};
export default bnICHIPowah
bnICHIPowah.id = 'bnICHIPowah'
bnICHIPowah.tags = ['bnICHIPowah','interperter']