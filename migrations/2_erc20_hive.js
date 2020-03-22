const Hive = artifacts.require("Hive");

module.exports = function(deployer) {
  deployer.deploy(Hive);
};
