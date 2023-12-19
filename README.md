## Solidity test Task

1. Develop a smart contract(-s) on Solidity for deploying a NFT collection (ERC721) with
some arguments (name, symbol). The smart contract should emit the following events:
a. CollectionCreated(address collection, name, symbol)
b. TokenMinted(address collection, address recipient, tokenId, tokenUri)
2. Develop a simple backend server with in-memory storage to handle emitted events and
serve it via HTTP.
3. Develop a front end demo application that interacts with the smart contract and has the
following functionality:
a. Create a new NFT collection with specified name and symbol (from user input);
b. Mints a new NFT with specified collection address (only created on 3.a), tokenId,
tokenUri.


### Init 

Install:

```
npm i
```

### Deploy contact

Set your `PRIVATE_KEY`, `SEP_API_KEY` in `hardhat.config.js`

run deploy command:

```
npx hardhat run --network sepolia scripts/deploy.js
```

result:
```
Deploying contracts with the account: <>
Account balance: <>
Contract address: <New Contract address>
```

### Setup

Create `.env` with alchemy Api Key and Contact address 
```
API_KEY=
CONTRACT_ADDR=
```

### Run

run web service:
```
node .\index.js
```
result:
```
Server is running on http://localhost:3000
```

### Use

Get all deployed contracts:
```
http://localhost:3000/collections
```

return exapmle:
```
{
    "collections": [
        "0x4E49Edbe3CA81346A526Db669717807875D83813",
        "0x89ceDAdB0EFe2b71F7561B0de82e186247D73dF5"
    ]
}
```


Get all minted NFT
```
http://localhost:3000/minted
```

return exapmle:
```
{
    "minted": {
        "0x89ceDAdB0EFe2b71F7561B0de82e186247D73dF5": [
            {
                "recipient": "0x78B77d5d7A1DFd9a2DA3EE91AFbc205B7eDD1D4d",
                "tokenId": "1"
            }
        ],
        "0x4E49Edbe3CA81346A526Db669717807875D83813": [
            {
                "recipient": "0x78B77d5d7A1DFd9a2DA3EE91AFbc205B7eDD1D4d",
                "tokenId": "1"
            }
        ]
    }
}
```

Web form:
```
http://localhost:3000/
```


