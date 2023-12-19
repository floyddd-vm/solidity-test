(function() {
	let appConfig = {
        abi: [
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
            }],
        contractAddress: '0xa7223e644BC9f5bB735B090BCeabeab020BF1412'       
    }
	window.appConfig = appConfig;
})();