const { expect } = require('chai');
const { ethers, deployments } = require('hardhat');

describe('token0', () => {
  it('transfer', async () => {
    await deployments.fixture(['Token0']);

    const [_, user1, user2] = await ethers.getSigners();

    const token0 = (await ethers.getContract('Token0')).connect(user1);

    // mint to user1
    await token0.faucet('500');

    // transfer to user2
    await token0.transfer(user2.address, '500');

    expect(await token0.balanceOf(user1.address)).to.equal('0');
    expect(await token0.balanceOf(user2.address)).to.equal('500');
  });
});
