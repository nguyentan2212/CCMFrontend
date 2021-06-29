//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract UserManager{
    struct User{
        uint256 Index;
        address Address;
        bool IsActive;
        bool IsAdmin;
    }
    User[] users;
    mapping(address => User) address2user;
    uint256 userCounter;
    
    constructor(){
        userCounter = 1;
        User storage user = address2user[msg.sender];
        user.Address = msg.sender;
        user.IsActive = true;
        user.IsAdmin = true;
        user.Index = userCounter-1;
        users.push(user);
    }
    
    modifier onlyAdmin(){
        require(address2user[msg.sender].IsAdmin == true, "User is not an admin");
        _;
    }
    
    function register() public {
        require(address2user[msg.sender].Address == address(0), "User with this address has already exitsted");
        
        userCounter++;
        User storage user = address2user[msg.sender];
        user.Address = msg.sender;
        user.IsActive = true;
        user.IsAdmin = false;
        user.Index = userCounter-1;
        users.push(user);
    }
    
    function getUserCounter() public view returns(uint256){
        return userCounter;
    }
    
    function isUser(address userAddress) public view returns(bool){
        if(address2user[userAddress].Address == address(0))
        {
            return(false);
        }
        return true;
    }
    
    function getUsers() public view returns(address[] memory, uint256[] memory){
        address[] memory addressList = new address[](userCounter);
        uint256[] memory indexList = new uint256[](userCounter);
        for (uint256 i = 0; i < userCounter; i++){
            addressList[i] = users[i].Address;
            indexList[i] = users[i].Index;
        }
        return (addressList,indexList);
    }
    
    function lock(address userAddress)  public onlyAdmin(){
        require(address2user[msg.sender].Address != address(0), "User not found");
        require(address2user[msg.sender].Address != address2user[userAddress].Address, "You can not lock yourself");
        User storage user = address2user[userAddress];
        user.IsActive = false;
    }
    
    function unlock(address userAddress)  public onlyAdmin(){
        require(address2user[msg.sender].Address != address(0), "User not found");
        require(address2user[msg.sender].Address != address2user[userAddress].Address, "You can not unlock yourself");
        User storage user = address2user[userAddress];
        user.IsActive = true;
    }
    
    function promote(address userAddress)  public onlyAdmin(){
        require(address2user[msg.sender].Address != address(0), "User not found");
        require(address2user[msg.sender].Address != address2user[userAddress].Address, "You can not promote yourself");
        User storage user = address2user[userAddress];
        user.IsAdmin = true;
    }
    
    function demote(address userAddress)  public onlyAdmin(){
        require(address2user[msg.sender].Address != address(0), "User not found");
        require(address2user[msg.sender].Address != address2user[userAddress].Address, "You can not demote yourself");
        User storage user = address2user[userAddress];
        user.IsAdmin = false;
    }
    
}