module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const initialSupply = '1000000000000000000000';
  const token1 = await deploy('Token1', {
    from: deployer,
    args: [initialSupply],
    log: true,
  });
};
module.exports.tags = ['Token1'];
