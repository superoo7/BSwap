import BigNumber from "bignumber.js";

// @ts-ignore
const BHive = artifacts.require("BHive");

contract("Burnable", accounts => {
  it("should have 0 supply token", async () => {
    const hive = await BHive.deployed();
    const totalSupply = await hive.totalSupply();
    assert.equal(totalSupply.toString(), new BigNumber(0).toString());
  });

  it("should burn token", async () => {
    const hive = await BHive.deployed();
    const amount = new BigNumber(2000);
    // Mint
    await hive.mint(accounts[0], amount, { from: accounts[0] });
    assert.equal((await hive.totalSupply()).toNumber(), amount.toNumber());
    assert.equal(
      (await hive.balanceOf(accounts[0])).toNumber(),
      amount.toNumber()
    );
    // Burn
    await hive.burnToBC(amount, "superoo7", { from: accounts[0] });
    assert.equal((await hive.totalSupply()).toNumber(), 0);
    assert.equal((await hive.balanceOf(accounts[0])).toNumber(), 0);
  });
});
