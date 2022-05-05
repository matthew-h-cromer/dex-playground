const { ethers } = require('hardhat');

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const initialSupply = '1000000000000000000000';
  const token0 = await deploy('Token0', {
    from: deployer,
    args: [initialSupply],
    log: true,
  });
};
module.exports.tags = ['Token0'];
