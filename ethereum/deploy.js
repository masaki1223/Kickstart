const HDWalletProvider = require("truffle-hdwallet-provider");
const secret = require('../secretFile.json');
const compiledFactory = require('./build/CampaignFactory.json');
const Web3 = require('web3');

const mnemonic = secret.mnemonic;
const accessToken = secret.ACCESS_TOKEN;

const provider = new HDWalletProvider(
    mnemonic,
    `https://rinkeby.infura.io/${accessToken}`
);

const web3 = new Web3(provider);

const bytecode = compiledFactory.bytecode;

const deploy = async()=> {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account: ', accounts[0]);

    try{
        const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: '0x' + bytecode })
        .send({
            from: accounts[0],
            gas: '1000000',
            gasPrice: web3.utils.toWei('2', 'gwei')
        });
        console.log('Contract deployed to: ' + result.options.address);
    } catch(err) {console.log(err)};
};
deploy();