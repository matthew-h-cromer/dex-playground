const { expect } = require('chai');
const { ethers, deployments } = require('hardhat');

describe('token0', () => {
  it('transfer', async () => {
    await deployments.fixture(['Token0']);

    const [deployer, user1] = await ethers.getSigners();

    const token0 = (await ethers.getContract('Token0')).connect(deployer);

    await token0.transfer(user1.address, '500');

    expect(await token0.balanceOf(user1.address)).to.equal('500');
  });
});
