import web3 from '../ethereum/web3.js';
import CampaignFactory from '../ethereum/build/CampaignFactory.json';



const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x6240dAEF3Be2915A782A4789885d4b0B277cF1B0'
);

export default instance;