import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'
import { getChainId } from 'hardhat'


const ichiPowah: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployer} = await hre.getNamedAccounts()
  const {deploy} = hre.deployments;
  const chainId = await getChainId()
  
await deploy('ICHIPowah', {
    from: deployer,
    log: true,
    }) 
};
export default ichiPowah
ichiPowah.id = 'ichiPowah'
ichiPowah.tags = ['ichiPowah','hub']