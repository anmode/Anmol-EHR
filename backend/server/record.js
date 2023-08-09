import web3 from './web3';
import Record from '../build/Record.json';

const instance = new web3.eth.Contract(
  JSON.parse(Record.interface),
  '0xfaa7180dd3d64c51503c8f3582a584A8562a0731'
);

export default instance;
