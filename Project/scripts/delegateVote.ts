import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/CustomBallot.sol/CustomBallot.json";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
// eslint-disable-next-line node/no-missing-import
import { CustomBallot, MyToken } from "../typechain";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

/*
Script:
- Delegate my vote by passing a user address as input and using the wallet in environment
Arguments:
- user address that you want to give your voting power to
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
  
  const delegateTokenTx = await tokenContract.delegate(toAddress);
  await delegateTokenTx.wait();

  const postDelegationVotingPower = await tokenContract.getVotes(toAddress);
  console.log(`Post delegation voting power: ${postDelegationVotingPower}`);

  console.log(`Delegating ${voterAddress}'s vote to ${toAddress} account.`);

  console.log(`Delegate transaction completed. Hash: ${delegateTokenTx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
