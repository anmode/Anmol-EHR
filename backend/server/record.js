import web3 from './web3';
import Record from '../build/Record.json';

const instance = new web3.eth.Contract(
  JSON.parse(Record.interface),
  '0x4978359DfdB1F1D046Fd461B1cc8D8e54434c9fc'
);

export default instance;
