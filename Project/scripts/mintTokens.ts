/* eslint-disable node/no-missing-import */
import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as tokenJson from "../artifacts/contracts/Token.sol/MyToken.json";
import { MyToken } from "../typechain";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

/*
The caller of this script (wallet used) should be authorized to mint tokens.
A safe strategy is to transfer tokens using the deployer's wallet.

Script parameters:
- Token address: address of the token to be minted
- Recipient address: address of the recipient of the tokens being minted
- Token quantity: quantity of token to mint to recipient address
*/
async function main() {
  // Set up wallet based on environment variables
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
  // Validate wallet balance to ensure sender has enough for gas fees
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  // Get address of token from script arguments and create Token object
  if (process.argv.length < 3) throw new Error("Token address missing");
  const tokenAddress = process.argv[2];
  console.log(`Attaching token contract interface to address ${tokenAddress}`);
  const tokenContract: MyToken = new Contract(
    tokenAddress,
    tokenJson.abi,
    signer
  ) as MyToken;
  // Get address of token recipient from script arguments
  if (process.argv.length < 3) throw new Error("Recipient address missing");
  const recipientAddress = process.argv[3];
  // Log total initial token supply
  const initialTotalSupply = await tokenContract.totalSupply();
  console.log(
    `Initial total supply: ${parseFloat(
      ethers.utils.formatEther(initialTotalSupply)
    )} tokens`
  );
  // Get token mint quantity of script arguments
  if (process.argv.length < 5) throw new Error("Token mint quantity missing");
  const tokenMintQuantity = parseInt(process.argv[4]);
  console.log(`Token mint quantity: ${tokenMintQuantity}`);
  // Mint tokens
  const tokenMintTx = await tokenContract.mint(
    recipientAddress,
    ethers.utils.parseEther(tokenMintQuantity.toFixed(18))
  );
  await tokenMintTx.wait();
  console.log(
    `Tokens successfully minted. Transaction hash: ${tokenMintTx.hash}`
  );
  // Log total token supply after mint transaction
  const finalTotalSupply = await tokenContract.totalSupply();
  console.log(
    `Final total supply: ${parseFloat(
      ethers.utils.formatEther(finalTotalSupply)
    )} tokens`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
