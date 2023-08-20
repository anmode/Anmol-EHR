import web3 from './web3';
import Record from '../build/Record.json';

const instance = new web3.eth.Contract(
  JSON.parse(Record.interface),
  '0x6C3763Cc18417c8a3F4485D0286c60Fb9dBdD6ad'
);

export default instance;
