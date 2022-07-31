/* eslint-disable node/no-missing-import */
import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { getSigner } from "./util/getSigner";
import { CustomBallot, MyToken } from "../typechain";

/*
Script:
- Delegate my vote by passing a user address as input and using the wallet in environment
Arguments:
- user address that you want to give your voting power to
*/
async function main() {
  const signer = await getSigner();

  if (process.argv.length < 3) throw new Error("Token address missing");
  const tokenAddress = process.argv[2];
  console.log(
    `Attaching token contract interface to address ${tokenAddress}`
  );
  const tokenContract: MyToken = new Contract(
    tokenAddress,
    tokenJson.abi,
    signer
  ) as MyToken;

  // get delegatee address from arguments
  if (process.argv.length < 4) throw new Error("Delegatee address missing");
  const toAddress = process.argv[3];
  const voterAddress = wallet.address;
  
  const preDelegationVotingPower = await tokenContract.getVotes(toAddress);
  console.log(`Pre delegation voting power: ${preDelegationVotingPower}`);
  
  console.log(`Delegating ${voterAddress}'s vote to ${toAddress} account.`);
  const delegateTokenTx = await tokenContract.delegate(toAddress);
  await delegateTokenTx.wait();
  console.log(`Delegate transaction completed. Hash: ${delegateTokenTx.hash}`);

  const postDelegationVotingPower = await tokenContract.getVotes(toAddress);
  console.log(`Post delegation voting power: ${postDelegationVotingPower}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
