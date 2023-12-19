// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./libraries/NFTCollection.sol";
import "./interfaces/INFTCollection.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
/**
 * @title Test Contract, deployer NFT Collections
 */
contract Contract
{
    event CollectionCreated(
        address indexed collection, 
        string indexed name, 
        string indexed symbol
    );

    event TokenMinted(
        address collection, 
        address recipient, 
        uint256 tokenId, 
        string indexed tokenUri
    );

    struct TKN{
        string name;
        string symbol;
        string baseUri;
    }

    mapping(address => TKN) public minted;

    function deploy(string memory name, string memory symbol, string memory baseUri) external returns (address token){
        token = address(new NFTCollection(name, symbol, baseUri));
        minted[token] = TKN(
                        name, 
                        symbol, 
                        baseUri);
        emit CollectionCreated(token, name, symbol);  
    }

    //TODO: mint only created collections(проверять список muinted)
    function mint(address collection, address recipient, uint256 tokenId) external {
        INFTCollection(collection).safeMint(recipient, tokenId);
        emit TokenMinted(
            collection, 
            recipient, 
            tokenId, 
            IERC721Metadata(collection).tokenURI(tokenId)
        );
    }
}