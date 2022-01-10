import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface), 
    '0x5afC354C41DAb497a9323af9B30ecf8B5f162746'
);

export default instance;