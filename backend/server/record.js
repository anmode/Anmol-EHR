import web3 from './web3';
import Record from '../build/Record.json';

const instance = new web3.eth.Contract(
  JSON.parse(Record.interface),
  '0xe459435025Ec7163B4f9a3d9cB851Fa6Fb420eE6'
);

export default instance;
