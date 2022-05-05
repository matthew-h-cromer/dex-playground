module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // FACTORY
  const feeToSetter = deployer;
  await deploy('UniswapV2Factory', {
    from: deployer,
    args: [feeToSetter],
    log: true,
  });

  // ROUTER
  await deploy('UniswapV2Router02', {
    from: deployer,
    args: [factory.address, '0x0000000000000000000000000000000000000000'],
    log: true,
  });
};
module.exports.tags = ['Uniswap'];
