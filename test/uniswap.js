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

  beforeEach(async () => {
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
      token0.address, // tokenA
      token1.address, // tokenB
      10000000000000000000n, // amountADesired
      10000000000000000000n, // amountBDesired
      10000000000000000000n, // amountAMin
      10000000000000000000n, // amountBMin
      deployer.address, // to
      2000000000 // deadline
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
      token0.address, // tokenA
      token1.address, // tokenB
      9999999999999999000n, // liquidity
      1000000000000000000n, // amountAMin
      1000000000000000000n, // amountBMin
      deployer.address, // to
      2000000000 // deadline
    );

    // check liquidity
    const [reserve0, reserve1] = await pair.getReserves();
    expect(reserve0).to.equal('1000');
    expect(reserve1).to.equal('1000');
    expect(await pair.balanceOf(deployer.address)).to.equal('0');
  });

  it('swap', async () => {
    // get some tokens
    await token0.faucet(1000000000000000000n);

    // swap
    await router.swapExactTokensForTokens(
      1000000000000000000n, // amountIn
      0, // amountOutMin
      [token0.address, token1.address], // path
      deployer.address, // to
      2000000000 // deadline
    );

    // check balances
    expect(String(await token0.balanceOf(deployer.address))).to.equal('990000000000000000000');
    expect(String(await token1.balanceOf(deployer.address))).to.equal('990906610893880149131');
  });
});
