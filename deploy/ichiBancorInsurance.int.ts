import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'
import { getChainId } from 'hardhat'


const ICHIBancorInsurance: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployer} = await hre.getNamedAccounts()
  const {deploy} = hre.deployments;
  const chainId = await getChainId()
  
await deploy('ICHIBancorInsurance', {
    from: deployer,
    log: true,
    }) 
};
export default ICHIBancorInsurance
ICHIBancorInsurance.id = 'ICHIBancorInsurance'
ICHIBancorInsurance.tags = ['ICHIBancorInsurance','interperter']