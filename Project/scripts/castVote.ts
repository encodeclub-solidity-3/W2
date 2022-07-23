import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot } from "../typechain";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

// TODO: Make script compatible with token gated voting

/*
Goal:
Cast a vote to a ballot passing contract address and proposal as input and using
the wallet in environment.

Script arguments:
- Ballot address (where the Ballot smart contract is deployed)
- Proposal to be voted on (by index number)

The voter is the address of the wallet in the environment.
*/
async function main() {
    const wallet =
      process.env.MNEMONIC && process.env.MNEMONIC.length > 0
        ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
        : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
    console.log(`Using address ${wallet.address}`);
    const provider = ethers.providers.getDefaultProvider("goerli");
    const signer = wallet.connect(provider);
    const balanceBN = await signer.getBalance();
    const balance = Number(ethers.utils.formatEther(balanceBN));
    console.log(`Wallet balance ${balance}`);
    if (balance < 0.01) {
      throw new Error("Not enough ether");
    }

    if (process.argv.length < 3) throw new Error("Ballot address missing");
    const ballotAddress = process.argv[2];
    if (process.argv.length < 4) throw new Error("Proposal number missing");
    const proposal = process.argv[3];
    if (process.argv.length < 5) throw new Error("Token quantity missing");
    const tokenQuantity = ethers.utils.parseEther(parseInt(process.argv[4]).toFixed(18));
    const voter = wallet.address;
    console.log(
      `Attaching ballot contract interface to address ${ballotAddress}`
    );
    const ballotContract: CustomBallot = new Contract(
      ballotAddress,
      ballotJson.abi,
      signer
    ) as CustomBallot;

    let proposalNum = parseInt(proposal);
    console.log(`Casting vote for proposal #${proposalNum} for account ${voter} using ${tokenQuantity} tokens`);
    const voteTx = await ballotContract.vote(proposalNum, tokenQuantity);
    console.log("Awaiting confirmations");
    await voteTx.wait();
    console.log(`Transaction completed. Hash: ${voteTx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
