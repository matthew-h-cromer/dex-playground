const { expect } = require('chai');
const { ethers, deployments } = require('hardhat');

describe('token1', () => {
  it('transfer', async () => {
    await deployments.fixture(['Token1']);

    const [_, user1, user2] = await ethers.getSigners();

    const token1 = (await ethers.getContract('Token1')).connect(user1);

    // mint to user1
    await token1.faucet('500');

    // transfer to user2
    await token1.transfer(user2.address, '500');

    expect(await token1.balanceOf(user1.address)).to.equal('0');
    expect(await token1.balanceOf(user2.address)).to.equal('500');
  });
});
