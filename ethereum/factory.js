import web3 from '../ethereum/web3.js';
import CampaignFactory from '../ethereum/build/CampaignFactory.json';



const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x223d8ac4D943D38B224048260B2F13665D31CbEc'
);

export default instance;