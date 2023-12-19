// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/INFTCollection.sol";

contract NFTCollection is INFTCollection, ERC721, Ownable {
    string baseURI;
    constructor(string memory name, string memory symbol, string memory __baseURI)
        ERC721(name, symbol)
        Ownable(msg.sender)    
    {
        baseURI = __baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}