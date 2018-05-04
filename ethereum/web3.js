import Web3 from 'web3';
const secret = require('../secretFile.json');
const accessToken = secret.ACCESS_TOKEN;

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //we are in the browser and user uses metamask
    web3 = new Web3(window.web3.currentProvider);
} else {
    //we are on the server *OR* user doesn't have metamask
    const provider = new Web3.providers.HttpProvider(
        `https://rinkeby.infura.io/${accessToken}`
    );
    web3 = new Web3(provider);
}
export default web3;