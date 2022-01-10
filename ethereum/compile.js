const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// get the build directory's path
const buildPath = path.resolve(__dirname, 'build');
// remove the build direcotry and everything inside of it
fs.removeSync(buildPath);

// get the contracts's path
const campaingPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
// read the contract file in utf8 format
const source = fs.readFileSync(campaingPath, 'utf8');
// compile the file and get the contracts output
const output = solc.compile(source, 1).contracts;

// if a direct does not exist in the buildPath create one, if one exists do nothing
fs.ensureDirSync(buildPath);

console.log(output);
for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, `${contract.replace(':', '')}.json`),
        // { interface: output[contract].interface, bytecode: output[contract].bytecode }
        output[contract]
    );
}