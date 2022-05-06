const { ethers } = require('hardhat');

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const token0 = await deploy('Token0', {
    from: deployer,
    args: [],
    log: true,
  });
};
module.exports.tags = ['Token0'];
