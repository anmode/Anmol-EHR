import web3 from './web3';
import Record from '../build/Record.json';

const instance = new web3.eth.Contract(
  JSON.parse(Record.interface),
  '0xF7BEf921C17022917E369b2747e7708eabE3e674'
);

export default instance;
