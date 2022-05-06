const { ethers } = require('hardhat');

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // WETH
  const wethDeployment = await deploy('WETH', {
    from: deployer,
    args: [],
    log: true,
  });

  // FACTORY
  const feeToSetter = deployer;
  const factoryDeployment = await deploy('UniswapV2Factory', {
    from: deployer,
    args: [feeToSetter],
    log: true,
  });

  // ROUTER
  await deploy('UniswapV2Router02', {
    from: deployer,
    args: [factoryDeployment.address, wethDeployment.address],
    log: true,
  });

  // initialize LP
  const token0 = await ethers.getContract('Token0');
  const token1 = await ethers.getContract('Token1');
  const factory = await ethers.getContract('UniswapV2Factory');
  await factory.createPair(token0.address, token1.address);
  const pair = await factory.getPair(token0.address, token1.address);
  console.log(`T0-T1 LP deployed at ${pair}`);
};
module.exports.tags = ['Uniswap'];
