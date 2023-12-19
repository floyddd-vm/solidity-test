const express = require('express');
const { Web3 } = require('web3');
const dotenv = require('dotenv');

BigInt.prototype.toJSON = function() { return this.toString() }

dotenv.config();

const app = express();
const port = 3000;

const ApiKey = process.env.API_KEY;
const web3 = new Web3(`wss://eth-sepolia.g.alchemy.com/v2/${ApiKey}`);

let collections = [];
let minted = {}


// Для примера используем ABI и адрес контракта ERC20, замените их соответствующими вашими данными
const contractAbi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "collection",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        }
      ],
      "name": "CollectionCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "collection",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "tokenUri",
          "type": "string"
        }
      ],
      "name": "TokenMinted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "baseUri",
          "type": "string"
        }
      ],
      "name": "deploy",
      "outputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "collection",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "minted",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "baseUri",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
const contractAddress = process.env.CONTRACT_ADDR;

app.use(express.json());

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const msg = err.message;
    console.error(err);
    //console.error(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${JSON.stringify(req.body || req.query)}.`);
    if(err instanceof ContractError)
        res.status(200).send({ err: 1, message: msg });
    else
        res.status(status).send({ err: 1, message: 'Something went wrong...' });
});

app.use(express.static('webapp'));


app.get('/', (req, res) => {
    res.send('Web3 App');
});

app.get('/collections', async (req, res) => {   
    res.json({ collections });
});

app.get('/minted', async (req, res) => {   
    res.json({ minted });
});

app.post('/send-transaction', async (req, res) => {
    const { to, value } = req.body;

    try {
        const accounts = await web3.eth.getAccounts();
        const from = accounts[0];

        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = 21000;

        const transaction = await web3.eth.sendTransaction({
            from,
            to,
            value: web3.utils.toWei(value, 'ether'),
            gasPrice,
            gasLimit,
        });

        res.json({ transactionHash: transaction.transactionHash });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send transaction' });
    }
});

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

/*
var subscription = web3.eth.subscribe('logs', {
    address: contractAddress,
    topics: ['0x3454b57f2dca4f5a54e8358d096ac9d1a0d2dab98991ddb89ff9ea1746260617']
}, function(error, result){
    if (!error)
        console.log(result);
});
*/
let options1 = {
    topics: ['0x3454b57f2dca4f5a54e8358d096ac9d1a0d2dab98991ddb89ff9ea1746260617'],
    fromBlock: 0
};

let options2 = {
    topics: ['0xc9fee7cd4889f66f10ff8117316524260a5242e88e25e0656dfb3f4196a21917'],
    fromBlock: 0
};


const contract = new web3.eth.Contract(contractAbi, contractAddress);

contract.events.CollectionCreated(options1)
    .on('data', event => {
        let return_values = event.returnValues;
        //add to collection array
        collections.push(return_values.collection);
        //console.log(return_values)
    })
    /*.on('changed', changed => console.log(changed))
    .on('error', err => {throw err})
    .on('connected', str => console.log(str))*/

contract.events.TokenMinted(options2)
    .on('data', event => {
        let return_values = event.returnValues;
        //add to minted array
        if(!minted[return_values.collection])
            minted[return_values.collection] = [];
        minted[return_values.collection].push({
            recipient: return_values.recipient,
            tokenId: return_values.tokenId
        });
        //collections.push(return_values.collection);
        console.log(return_values)
    })