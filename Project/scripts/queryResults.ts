/* eslint-disable node/no-missing-import */
import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import { CustomBallot } from "../typechain";
import { getSigner } from "./util/getSigner";

// TODO: Make script compatible with token gated voting

async function main() {
  const signer = await getSigner();
  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const ballotAddress = process.argv[2];
  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );
  const ballotContract: CustomBallot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as CustomBallot;

  // Ballot question
  console.log("Ballot: Which ETHGlobal hackathon should we hack at next?");

  for (let i = 0; i < 5; i++) {
    const proposal = await ballotContract.proposals(i);
    const proposalString = ethers.utils.parseBytes32String(proposal.name);
    const voteCount = parseFloat(ethers.utils.formatEther(proposal.voteCount));
    console.log(`${i}: ${proposalString} received ${voteCount} votes`);
  }

  console.log(`End of results`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
