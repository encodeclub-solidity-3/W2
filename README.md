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
Contract deployed at 0x6fFD49B16297c51eBa57721AE4193f3cc7a8E6C5
✨  Done in 57.98s.
```
`Token Contract Address` [x6fFD49B16297c51eBa57721AE4193f3cc7a8E6C5](https://goerli.etherscan.io/address/0x6ffd49b16297c51eba57721ae4193f3cc7a8e6c5)

`Transaction Hash` [0x74d3b779389b2de3f86d3aec2c667e03f1f0a29e0519288efbbe98c4a8a8757c](https://goerli.etherscan.io/tx/0x74d3b779389b2de3f86d3aec2c667e03f1f0a29e0519288efbbe98c4a8a8757c)






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
Using address 0xC0c630f5c9A78A75a92617852AD0F4E80BF252Cf
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
Contract deployed at 0xC0c630f5c9A78A75a92617852AD0F4E80BF252Cf
✨  Done in 28.26s.
```
`Ballot Contract Address` [0xC0c630f5c9A78A75a92617852AD0F4E80BF252Cf](https://goerli.etherscan.io/address/0x471fde047d8aee6aca94afdbeb4a624e8bd59795)

`Transaction Hash` [0x96f7c9742c166ded81e66e373221a4bb33259d471b608ec72412a2ccd948662f](https://goerli.etherscan.io/tx/0x96f7c9742c166ded81e66e373221a4bb33259d471b608ec72412a2ccd948662f)

<br></br>

## 3. Giving voting rights to a wallet by minting tokens

<br></br>

## 4. Querying ballot proposals
`queryProposals.ts`

```
console.log("Ballot: Which ETHGlobal hackathon should we hack at next?");
  for (let i = 0; i < 5; i++) {
    const proposal = await ballotContract.proposals(i);
    const proposalString = ethers.utils.parseBytes32String(proposal.name);
    console.log(`${i}: ${proposalString}`);
  }

  console.log(`End of proposals`);
```
<br></br>

## 5. Casting votes

<br></br>

## 6. Delegating votes

<br></br>

## 7. Querying ballot results


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
