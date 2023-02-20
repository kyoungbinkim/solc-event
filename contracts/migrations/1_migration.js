const eventContract = artifacts.require('EventContact');

module.exports = function (deployer) {
    deployer.deploy(eventContract);
}
