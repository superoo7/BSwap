const Hive = artifacts.require("BHive");

module.exports = function(deployer) {
  deployer.deploy(Hive);
};
