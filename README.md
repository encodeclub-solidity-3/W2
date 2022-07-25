# Encode Club Solidity Bootcamp
### Week 2 Project - July 2022 Cohort
Team Members: 
- Daiana Bilbao (hello_dayana#4030)
- Kevin Le (water1925#7425)
- Christina Polyukh (cpolyukh#5660)
<br><br>

## Overview
### DKC Token
We are creating a tokenized ballot voting system that consists of a ballot smart contract with proposals to vote on, and an accompanying ERC-20 token that is used to cast votes. Our scripts will do the following:
* Deploy the token smart contract
* Deploy the ballot smart contract from a snapshot
* Give voting rights to a wallet by minting tokens
* Query ballot proposals
* Cast votes
* Delegate votes
* Query ballot results

<br></br>
## 1. Deploying the token smart contract
DKC Token has been deployed on the Goerli test network 
### ```deployToken.ts```

```
yarn ts-node ./scripts/deployToken.ts
yarn run v1.22.18
$ ./scripts/deployToken.ts
Using address 0xc50e3344bc24f14f4a65E127D655F20441fC3D7e
Wallet balance 0.09091337644196155
Deploying Token contract
Awaiting confirmations
Completed
Contract deployed at 0xe910B98E3eE9528B56b52964EeCeCd7B1B6e12b5
✨  Done in 57.98s.
```
`Token Contract Address` [0xe910B98E3eE9528B56b52964EeCeCd7B1B6e12b5](https://goerli.etherscan.io/address/0xe910B98E3eE9528B56b52964EeCeCd7B1B6e12b5)

`Transaction Hash` [0xc17cdd2c1d464b07fc764f158c06b6b35576722683da8ab49a52dd714947d708](https://goerli.etherscan.io/tx/0xc17cdd2c1d464b07fc764f158c06b6b35576722683da8ab49a52dd714947d708)

<br></br>
## 2. Deploying the ballot smart contract from a snapshot

### Ballot 
Which ETHGlobal hackathon should we hack at next?

### Proposals
1. ETHOnline
2. ETHMexico
3. ETHBogotá
4. ETHSanFrancisco
5. ETHIndia

### ```deployment.ts```
In our deployment script, we are deploying the `CustomBallot.sol` smart contract. This smart contract has an interface `IERC20Votes`, which contains the function `getPastVotes()`. `getPastVotes()` returns the account voting power based on a previous snapshot. More specifically, the snapshot is taken when the reference block number is stored when the ballot is deployed.

```
yarn ts-node ./scripts/deployment.ts ETHOnline ETHMexico ETHBogotá ETHSanFrancisco ETHIndia 
yarn run v1.22.18
./scripts/deployment.ts ETHOnline ETHMexico ETHBogotá ETHSanFrancisco ETHIndia
Using address 0xc50e3344bc24f14f4a65E127D655F20441fC3D7e
Wallet balance 0.08420208990654587
Deploying Ballot contract
Proposals: 
Proposal N. 1: ETHOnline
Proposal N. 2: ETHMexico
Proposal N. 3: ETHBogotá
Proposal N. 4: ETHSanFrancisco
Proposal N. 5: ETHIndia
Awaiting confirmations
Completed
Contract deployed at 0x9f08c399e757b6974cE0513aa6cd57D31a32e8ca
✨  Done in 28.26s.
```
`Ballot Contract Address` [0x9f08c399e757b6974cE0513aa6cd57D31a32e8ca](https://goerli.etherscan.io/address/0x9f08c399e757b6974cE0513aa6cd57D31a32e8ca)

`Transaction Hash` [0xa5fd95d45f50a27877dd6830268fde372f1dec65689e039932a44d8bf184198b](https://goerli.etherscan.io/tx/0xa5fd95d45f50a27877dd6830268fde372f1dec65689e039932a44d8bf184198b)

<br></br>

## 3. Minting tokens
We minted 265 DKC Tokens to 5 different addresses using our
`mintTokens.ts` script. Run script with Token contract address, the recipient of the token(s), and the token quantity. Below is an example of our script usage:

```
yarn ts-node ./scripts/mintTokens.ts 0x6fFD49B16297c51eBa57721AE4193f3cc7a8E6C5 0xc50e3344bc24f14f4a65E127D655F20441fC3D7e 13
yarn run v1.22.18
$ /node_modules/.bin/ts-node' ./scripts/mintTokens.ts 0x6fFD49B16297c51eBa57721AE4193f3cc7a8E6C5 0xc50e3344bc24f14f4a65E127D655F20441fC3D7e 13
Using address 0xc50e3344bc24f14f4a65E127D655F20441fC3D7e
Wallet balance 0.11868161533402602
Attaching token contract interface to address 0x6fFD49B16297c51eBa57721AE4193f3cc7a8E6C5
Initial total supply: 1e-16 tokens
Token mint quantity: 13
Tokens successfully minted. Transaction hash: 0x773852eee84f63eca13aed0b9f03899d1fba4d430cbf9d936e8d10ab18bbcd4c
Final total supply: 13 tokens
✨  Done in 21.83s.
```
`Transaction Hash` [0xb5c1aa162e317cdd7c61bfe542222b5aeb00cf4896bb05f07d54d8cc412a22c9](https://goerli.etherscan.io/tx/0xb5c1aa162e317cdd7c61bfe542222b5aeb00cf4896bb05f07d54d8cc412a22c9)

`DKC Token Holders`
[https://goerli.etherscan.io/token/tokenholderchart/0xe910B98E3eE9528B56b52964EeCeCd7B1B6e12b5](https://goerli.etherscan.io/tx/0xa5fd95d45f50a27877dd6830268fde372f1dec65689e039932a44d8bf184198b)
<br></br>

## 4. Querying ballot proposals
`queryProposals.ts`
After running this script with the ballot contract address we get the following ballot proposals:
```
yarn run ts-node ./scripts/queryProposals.ts 0x9f08c399e757b6974cE0513aa6cd57D31a32e8ca
yarn run v1.22.18
$ '/node_modules/.bin/ts-node' ./scripts/queryProposals.ts 0x9f08c399e757b6974cE0513aa6cd57D31a32e8ca
Using address 0xc50e3344bc24f14f4a65E127D655F20441fC3D7e
Wallet balance 0.11837792233258734
Attaching ballot contract interface to address 0x9f08c399e757b6974cE0513aa6cd57D31a32e8ca
Ballot: Which ETHGlobal hackathon should we hack at next?
0: ETHOnline
1: ETHMexico
2: ETHBogotá
3: ETHSanFrancisco
4: ETHIndia
End of proposals
✨  Done in 5.42s.
```
<br></br>

## 5. Delegating votes
Delegating a wallet's voting power to another wallet. Before delegating, the delegator wallet has 222 voting power, and the target delegatee wallet has 13 voting power. After delegating, the target wallet has a total of 235 voting power.

`delegateVote.ts`
```
% yarn ts-node ./scripts/delegateVote.ts 0xe910B98E3eE9528B56b52964EeCeCd7B1B6e12b5 0xc50e3344bc24f14f4a65E127D655F20441fC3D7e
yarn run v1.22.18
$ '/node_modules/.bin/ts-node' ./scripts/delegateVote.ts 0xe910B98E3eE9528B56b52964EeCeCd7B1B6e12b5 0xc50e3344bc24f14f4a65E127D655F20441fC3D7e
Using address 0xf5e2e431864DCd48A5b00713CEf9ab919c539213
Wallet balance 0.04958867599791108
Attaching token contract interface to address 0xe910B98E3eE9528B56b52964EeCeCd7B1B6e12b5
Pre delegation voting power: 13.0000000000000001
Delegating 0xf5e2e431864DCd48A5b00713CEf9ab919c539213's vote to 0xc50e3344bc24f14f4a65E127D655F20441fC3D7e account.
Delegate transaction completed. Hash: 0xc2e0c057a5af17ab5f6e903e97b6a032d364828952320fd83c1b16c486f54ea3
Post delegation voting power: 235.0000000000000001
```
`Transaction Hash`[0xc2e0c057a5af17ab5f6e903e97b6a032d364828952320fd83c1b16c486f54ea3](https://goerli.etherscan.io/tx/0xc2e0c057a5af17ab5f6e903e97b6a032d364828952320fd83c1b16c486f54ea3)

<br></br>

## 6. Casting votes
Before casting a vote, you must ensure you have voting rights by delgating to yourself or someone else. To cast a vote provide the ballot contract address, the proposal number you want to vote for, and the token quantity you want to apply to your vote. 

```
yarn ts-node ./scripts/castVote.ts 0x9f08c399e757b6974cE0513aa6cd57D31a32e8ca 4 2
yarn run v1.22.10
$ /Users/day/Solidity-Projects/W2/Project/node_modules/.bin/ts-node ./scripts/castVote.ts 0x9f08c399e757b6974cE0513aa6cd57D31a32e8ca 4 2
Using address 0x8111100ca76F61c939f2cD4E0A24Cb9ad665b7C2
Wallet balance 0.029211041166427767
Attaching ballot contract interface to address 0x9f08c399e757b6974cE0513aa6cd57D31a32e8ca
Voting power prior to voting: 45
Casting vote for proposal #4 for account 0x8111100ca76F61c939f2cD4E0A24Cb9ad665b7C2 using 2 tokens
Awaiting confirmations
Transaction completed. Hash: 0x6460e3409e19587222f3fb8fe96c58c06c5315651bac35062067217e28f318d7
Voting power after voting: 43
✨  Done in 250.74s.
```
`Transaction Hash`[0x6460e3409e19587222f3fb8fe96c58c06c5315651bac35062067217e28f318d7](https://goerli.etherscan.io/tx/0x6460e3409e19587222f3fb8fe96c58c06c5315651bac35062067217e28f318d7)
<br></br>

## 7. Querying ballot results
Below are the results from voting a few times from different accounts. We were able to successfully cast votes for given proposals using DKC Tokens by delgating and casting votes. To run our script, you just need to provide the ballot contract address. 

```
yarn ts-node ./scripts/queryResults.ts 0x9f08c399e757b6974cE0513aa6cd57D31a32e8ca
yarn run v1.22.10
$ /Users/day/Solidity-Projects/W2/Project/node_modules/.bin/ts-node ./scripts/queryResults.ts 0x9f08c399e757b6974cE0513aa6cd57D31a32e8ca
Using address 0xC0c630f5c9A78A75a92617852AD0F4E80BF252Cf
Wallet balance 0.022073870485231017
Attaching ballot contract interface to address 0x9f08c399e757b6974cE0513aa6cd57D31a32e8ca
Ballot: Which ETHGlobal hackathon should we hack at next?
0: ETHOnline received 1 votes
1: ETHMexico received 2 votes
2: ETHBogotá received 1 votes
3: ETHSanFrancisco received 5 votes
4: ETHIndia received 2 votes
End of results
✨  Done in 4.44s.
```


<br></br>
<br></br>
# From Original Repository
# Lesson 8 - Tokenized Votes
## The ERC20Votes ERC20 extension
* ERC20Votes properties
* Snapshots
* Creating snapshots when supply changes
* Using snapshots
* Self delegation
* Contract overall operation
### References
https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Votes

https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Snapshot
<pre><code>// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract MyToken is ERC20, ERC20Permit, ERC20Votes {
    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}</code></pre>
## ERC20Votes and Ballot.sol
* (Review) TDD
* Mapping scenarios
* Contracts structure

# Homework
* Create Github Issues with your questions about this lesson
* Read the references
* (Optional) Study how ERC20Permit works https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Permit
* (Optional) Study and try out a full governance example from https://docs.openzeppelin.com/contracts/4.x/governance

# Weekend project
* Form groups of 3 to 5 students
* Complete the contracts together
* Structure scripts to
  * Deploy everything
  * Interact with the ballot factory
  * Query proposals for each ballot
  * Operate scripts
* Publish the project in Github
* Run the scripts with a few set of proposals, play around with token balances, cast and delegate votes, create ballots from snapshots, interact with the ballots and inspect results
* Write a report detailing the addresses, transaction hashes, description of the operation script being executed and console output from script execution for each step
* (Extra) Use TDD methodology
