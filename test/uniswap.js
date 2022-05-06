const { expect } = require('chai');
const { ethers, deployments } = require('hardhat');

describe('uniswap', () => {
  it('add liquidity', async () => {
    await deployments.fixture(['Uniswap', 'Token0', 'Token1']);

    // accounts
    const [deployer] = await ethers.getSigners();

    // contracts
    const token0 = (await ethers.getContract('Token0')).connect(deployer);
    const token1 = (await ethers.getContract('Token1')).connect(deployer);
    const factory = (await ethers.getContract('UniswapV2Factory')).connect(deployer);
    const router = (await ethers.getContract('UniswapV2Router02')).connect(deployer);

    // approve router for tokens
    await token0.approve(router.address, 1000000000000000000000n);
    await token1.approve(router.address, 1000000000000000000000n);

    // add liquidity to the trading pair
    await router.addLiquidity(
      token0.address,
      token1.address,
      10000000000000000000n,
      10000000000000000000n,
      10000000000000000000n,
      10000000000000000000n,
      deployer.address,
      2000000000
    );
  });
});
