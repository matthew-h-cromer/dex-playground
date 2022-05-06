module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // WETH
  const weth = await deploy('WETH', {
    from: deployer,
    args: [],
    log: true,
  });

  // FACTORY
  const feeToSetter = deployer;
  const factory = await deploy('UniswapV2Factory', {
    from: deployer,
    args: [feeToSetter],
    log: true,
  });

  // ROUTER
  await deploy('UniswapV2Router02', {
    from: deployer,
    args: [factory.address, weth.address],
    log: true,
  });
};
module.exports.tags = ['Uniswap'];
