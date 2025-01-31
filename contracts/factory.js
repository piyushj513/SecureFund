import web3 from './web3';
import ProjectFactory from '../artifacts/contracts/Project.sol/ProjectFactory.json';

//const instance = new web3.eth.Contract(ProjectFactory.abi,"0xEf0592FBc210d966b18D87782B683223b099d9dd"); //deployed contract address
const instance = new web3.eth.Contract(
  ProjectFactory.abi,
  process.env.NEXT_PUBLIC_ADDRESS
);

export default instance;
