import BigNumber from "bignumber.js";

// @ts-ignore
const Hive = artifacts.require("Hive");

contract("WrappedToken", accounts => {
  it("unable to renounce ownership as Owner", async () => {
    const hive = await Hive.deployed();
    try {
      await hive.renounceOwnership({ from: accounts[0] });
      throw new Error("ERROR: Owner can renounceOwnership");
    } catch (err) {
      assert.equal(
        err.message,
        "Returned error: VM Exception while processing transaction: revert renouncing ownership is blocked -- Reason given: renouncing ownership is blocked."
      );
    }
  });

  it("adds minter", async () => {
    const hive = await Hive.deployed();
    assert.equal(await hive.isMinter(accounts[1]), false);
    await hive.addMinter(accounts[1]);
    assert.equal(await hive.isMinter(accounts[1]), true);
    // Minters can mint
    const initialSupply = new BigNumber(await hive.totalSupply());
    const amount = new BigNumber(1000);
    await hive.mint(accounts[1], amount, { from: accounts[1] });
    assert.equal((await hive.balanceOf(accounts[1])).toNumber(), amount);
    assert.equal(
      (await hive.totalSupply()).toNumber(),
      initialSupply.plus(amount).toNumber()
    );
  });

  it("removes minter", async () => {
    const hive = await Hive.deployed();
    assert.equal(await hive.isMinter(accounts[2]), false);
    await hive.addMinter(accounts[2]);
    assert.equal(await hive.isMinter(accounts[2]), true);
    await hive.removeMinter(accounts[2]);
    assert.equal(await hive.isMinter(accounts[2]), false);
    try {
      await hive.mint(accounts[2], 100, { from: accounts[2] });
      throw new Error("ERROR: removed minter are allowed to mint");
    } catch (err) {
      assert.equal(
        err.message,
        "Returned error: VM Exception while processing transaction: revert MinterRole: caller does not have the Minter role -- Reason given: MinterRole: caller does not have the Minter role."
      );
    }
  });
});
