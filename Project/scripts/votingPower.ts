import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
// eslint-disable-next-line node/no-missing-import
import { getSigner } from './util/getSigner';
import { CustomBallot, IERC20Votes, MyToken } from "../typechain";

/*
Query voting power for current address with provided ballot contract.
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

    const votingPower = await tokenContract.getVotes(wallet.address);
    const votingPowerFormatted = parseFloat(ethers.utils.formatEther(votingPower));

    console.log(`Voting power for current address: ${votingPowerFormatted}`);
}
function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
