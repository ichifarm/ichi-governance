import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'
import { getChainId } from 'hardhat'


const tokenBalancePowah: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployer} = await hre.getNamedAccounts()
  const {deploy} = hre.deployments;
  const chainId = await getChainId()
  
await deploy('TokenBalance', {
    from: deployer,
    log: true,
    }) 
};
export default tokenBalancePowah
tokenBalancePowah.id = 'tokenBalancePowah'
tokenBalancePowah.tags = ['tokenBalancePowah','interperter']