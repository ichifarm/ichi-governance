import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'
import { getChainId } from 'hardhat'


const ichiRariPowah: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployer} = await hre.getNamedAccounts()
  const {deploy} = hre.deployments;
  const chainId = await getChainId()
  
await deploy('ichiRariPowah', {
    from: deployer,
    log: true,
    }) 
};
export default ichiRariPowah
ichiRariPowah.id = 'ichiRariPowah'
ichiRariPowah.tags = ['ichiRariPowah','interperter']