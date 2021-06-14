import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'
import { getChainId } from 'hardhat'


const ICHIFarmPowah: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployer} = await hre.getNamedAccounts()
  const {deploy} = hre.deployments;
  const chainId = await getChainId()
  
await deploy('ICHIFarmPowah', {
    from: deployer,
    log: true,
    }) 
};
export default ICHIFarmPowah
ICHIFarmPowah.id = 'ICHIFarmPowah'
ICHIFarmPowah.tags = ['ICHIFarmPowah','interperter']