import {HardhatRuntimeEnvironment} from 'hardhat/types'
import {DeployFunction} from 'hardhat-deploy/types'
import { getChainId } from 'hardhat'


const oneINCHICHIPowah: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployer} = await hre.getNamedAccounts()
  const {deploy} = hre.deployments;
  const chainId = await getChainId()
  
await deploy('oneINCHICHIPowah', {
    from: deployer,
    log: true,
    }) 
};
export default oneINCHICHIPowah
oneINCHICHIPowah.id = '1INCHICHIPowah'
oneINCHICHIPowah.tags = ['1INCHICHIPowah','interperter']