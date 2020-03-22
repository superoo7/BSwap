// @ts-ignore
const Hive = artifacts.require("BHive");

contract("BHive", accounts => {
  it("Show correct details", async () => {
    const hive = await Hive.deployed();
    const [name, decimals, symbol] = await Promise.all([
      hive.name(),
      hive.decimals(),
      hive.symbol()
    ]);
    assert.equal(name, "Hive Pegged");
    assert.equal(decimals.toNumber(), 4);
    assert.equal(symbol, "HIVEP");
  });
});
