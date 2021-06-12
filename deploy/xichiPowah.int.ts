import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'
import { getChainId } from 'hardhat'


const xICHIPowah: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployer} = await hre.getNamedAccounts()
  const {deploy} = hre.deployments;
  const chainId = await getChainId()
  
await deploy('xICHIPowah', {
    from: deployer,
    log: true,
    }) 
};
export default xICHIPowah
xICHIPowah.id = 'xICHIPowah'
xICHIPowah.tags = ['xICHIPowah','interperter']