module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('Token1', {
    from: deployer,
    args: [],
    log: true,
  });
};
module.exports.tags = ['Token1'];
