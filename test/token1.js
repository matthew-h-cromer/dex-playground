const { expect } = require('chai');
const { ethers, deployments } = require('hardhat');

describe('token1', () => {
  it('transfer', async () => {
    await deployments.fixture(['Token1']);

    const [deployer, user1] = await ethers.getSigners();

    const token1 = (await ethers.getContract('Token1')).connect(deployer);

    await token1.transfer(user1.address, '500');

    expect(await token1.balanceOf(user1.address)).to.equal('500');
  });
});
