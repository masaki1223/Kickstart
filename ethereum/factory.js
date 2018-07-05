import web3 from "../ethereum/web3.js";
import CampaignFactory from "../ethereum/build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xfA329543E0C9F898906eB96b4a5d4fd713a22861"
);

export default instance;
