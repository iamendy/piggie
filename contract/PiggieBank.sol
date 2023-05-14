// SPDX-License-Identifier: MIT
//Author @nnamdipremium

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PiggyBank {
  address piggyTokenAddress;

  enum Status {
    INACTIVE,
    ACTIVE
  }

  struct Account {
    uint256 balance;
    Status status;
    uint256 createdAt;
    uint256 expiresAt;
  }

  mapping(address => Account) records;

  event Created(
    address indexed owner,
    uint amount,
    uint indexed createdAt,
    uint expiresAt
  );
  event Updated(uint amount, uint updatedAt);
  event Broken(address indexed owner, uint saved, uint expiredAt);

  modifier isNotActive() {
    require(
      records[msg.sender].status == Status.INACTIVE,
      "Piggie already exists"
    );
    _;
  }

  constructor(address _piggyTokenAddress) {
    piggyTokenAddress = _piggyTokenAddress;
  }

  function createPiggy(uint _amount, uint _duration) external isNotActive {
    require(_amount > 0 && _duration > 0, "Invalid values");

    //get the token contract and transfer
    IERC20(piggyTokenAddress).transferFrom(msg.sender, address(this), _amount);

    uint expiresAt = block.timestamp + (_duration * 86400); //convert to days
    records[msg.sender] = Account({
      balance: _amount,
      status: Status.ACTIVE,
      createdAt: block.timestamp,
      expiresAt: expiresAt
    });

    emit Created(msg.sender, _amount, expiresAt, block.timestamp);
  }

  function updateBalance(uint _amount) external {
    require(
      records[msg.sender].status == Status.ACTIVE,
      "Piggie is not ACTIVE"
    );
    require(_amount > 0, "Invalid amount");

    //get the token contract and transfer
    IERC20(piggyTokenAddress).transferFrom(msg.sender, address(this), _amount);

    records[msg.sender].balance += _amount;
    emit Updated(_amount, block.timestamp);
  }

  function breakPiggy() external {
    Account memory account = records[msg.sender];

    require(account.status == Status.ACTIVE, "No record");
    require(block.timestamp >= (account.expiresAt), "Not yet time.");

    //get the token contract and transfer
    IERC20(piggyTokenAddress).transfer(msg.sender, account.balance);

    //reset record
    account.balance = 0;
    account.createdAt = 0;
    account.expiresAt = 0;
    account.status = Status.INACTIVE;

    records[msg.sender] = account;
    emit Broken(msg.sender, account.balance, block.timestamp);
  }

  function getRecord() external view returns (Account memory) {
    return records[msg.sender];
  }

  function getAddress() external view returns (address) {
    return msg.sender;
  }
}

contract PiggyToken is ERC20, Ownable {
  constructor() ERC20("Piggy Token", "PTK") {}

  function mint(uint256 amount) external {
    _mint(msg.sender, amount);
  }
}
