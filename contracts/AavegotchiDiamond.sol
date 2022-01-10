//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract AavegotchiDiamond {
  struct TokenIdsWithKinship {
    uint256 tokenId;
    uint256 kinship;
    uint256 lastInteracted;
  }

  constructor() {}

  function interact(uint256[] calldata _tokenIds) external {}

  function setPetOperatorForAll(address _operator, bool _approved) external {}

  function kinship(uint256 _tokenId) external view returns (uint256 score_) {}

  function isPetOperatorForAll(address _owner, address _operator)
    external
    view
    returns (bool approved_)
  {}

  function tokenIdsWithKinship(
    address _owner,
    uint256 _count,
    uint256 _skip,
    bool all
  ) external view returns (TokenIdsWithKinship[] memory tokenIdsWithKinship_) {}
}
