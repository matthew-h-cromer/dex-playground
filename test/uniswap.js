const { expect } = require('chai');
const { ethers, deployments } = require('hardhat');

describe('uniswap', () => {
  // accounts
  let deployer;

  // contracts
  let token0;
  let token1;
  let factory;
  let router;
  let pair;

  before(async () => {
    await deployments.fixture(['Uniswap', 'Token0', 'Token1']);

    // accounts
    [deployer] = await ethers.getSigners();

    // contracts
    token0 = (await ethers.getContract('Token0')).connect(deployer);
    token1 = (await ethers.getContract('Token1')).connect(deployer);
    factory = (await ethers.getContract('UniswapV2Factory')).connect(deployer);
    router = (await ethers.getContract('UniswapV2Router02')).connect(deployer);

    // approve router for tokens
    await token0.approve(router.address, 1000000000000000000000n);
    await token1.approve(router.address, 1000000000000000000000n);

    // mint tokens to deployer
    await token0.faucet(1000000000000000000000n);
    await token1.faucet(1000000000000000000000n);

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

    // store the pair contract
    const pairAddress = await factory.getPair(token0.address, token1.address);
    pair = (await ethers.getContractAt('UniswapV2Pair', pairAddress)).connect(deployer);
  });

  it('add liquidity', async () => {
    // check liquidity
    expect(await pair.token0()).to.equal(token0.address);
    expect(await pair.token1()).to.equal(token1.address);
    const [reserve0, reserve1] = await pair.getReserves();
    expect(reserve0).to.equal('10000000000000000000');
    expect(reserve1).to.equal('10000000000000000000');
    expect(await pair.balanceOf(deployer.address)).to.equal('9999999999999999000');
  });

  it('remove liquidity', async () => {
    // approve router to remove liquidity
    await pair.approve(router.address, '9999999999999999000');

    // remove liquidity
    await router.removeLiquidity(
      token0.address,
      token1.address,
      9999999999999999000n,
      1000000000000000000n,
      1000000000000000000n,
      deployer.address,
      2000000000
    );

    // check liquidity
    const [reserve0, reserve1] = await pair.getReserves();
    expect(reserve0).to.equal('1000');
    expect(reserve1).to.equal('1000');
    expect(await pair.balanceOf(deployer.address)).to.equal('0');
  });
});
