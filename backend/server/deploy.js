const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledRecord = require('../build/Record.json');
const fs = require('fs');

// Link to your local Ethereum network by using Infura and providing the seed phrase of your Metamask wallet
const provider = new HDWalletProvider(
  'annual melt special behind idle answer ten snow saddle someone farm crisp', // Replace with your actual Metamask seed phrase
  'http://127.0.0.1:8546' // Replace with the correct RPC URL for your local Ethereum network
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  try {
    //Deploy contract to rinkeby network
    const result = await new web3.eth.Contract(JSON.parse(compiledRecord.interface))
    .deploy({ data: compiledRecord.bytecode })
    .send({ gas: '6721975', gasPrice: '20000000000', from: accounts[0] });


    console.log('Contract deployed to', result.options.address);

    // Write the contract address to record.js
    const recordJsContent = `import web3 from './web3';
import Record from './build/Record.json';

const instance = new web3.eth.Contract(
  JSON.parse(Record.interface),
  '${result.options.address}'
);

export default instance;
`;

    fs.writeFileSync('record.js', recordJsContent);

    console.log('Contract address updated in record.js');

    // Always go to record.js after updating Solidity code
    // Implement the code to navigate to the record.js or another desired page here
  } catch (error) {
    console.error('Error deploying contract:', error);
  }
};

deploy();
