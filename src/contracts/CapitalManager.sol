//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./UserManager.sol";

contract CapitalManager{
    
    enum CapitalAsset{SHORT_TERM_ASSETS, LONG_TERM_ASSETS}
    enum CapitalType{WORKING, EQUITY}
    enum CapitalStatus{FINISHED,CANCELLED}
    
    struct Capital {
        uint256 Index;
        uint256 Id;
        string Title;
        string Description;
        CapitalType Type;
        CapitalAsset Asset;
        CapitalStatus Status;
        uint256 Value;
        address Creator;
    }
    
    Capital[] capitals;
    mapping(uint256 => Capital) id2capital;
    mapping(uint256 => Capital) index2capital;
    uint256 capitalCounter;
    
    modifier onlyUser(){
        UserManager manager = new UserManager();
        require(manager.isUser(msg.sender) == true, "Sender is not a user");
        _;
    }
    
    constructor(){
        capitalCounter = 0;
    }
    
    function createCapital(uint256 id, string memory title, string memory des, uint8 ctype, uint8 casset, uint256 value) public {
        require(id2capital[id].Id == 0, "This capital has already exitsted");
        capitalCounter++;
        
        Capital storage capital = index2capital[capitalCounter-1];
        capital.Id = id;
        capital.Index = capitalCounter;
        capital.Title = title;
        capital.Description = des;
        capital.Type = CapitalType(ctype);
        capital.Asset = CapitalAsset(casset);
        capital.Value = value;
        capital.Status = CapitalStatus.FINISHED;
        capital.Creator = msg.sender;
        
        id2capital[id] = capital;
        capitals.push(capital);
    } 
    
    function cancel(uint256 id) public {
        require(id2capital[id].Id != 0, "Capital not found");
        
        Capital storage capital = id2capital[id];
        capital.Status = CapitalStatus.CANCELLED;
    }
    
    function getCapitalCounter() public view returns(uint256){
        return capitalCounter;
    }
}