pragma solidity^0.4.18;

contract CampaignFactory {
address[] public deployedCampaign;

function createCampaign(uint _minimum) public payable {
address newCampaign = new Campaign(_minimum, msg.sender);
deployedCampaign.push(newCampaign);
}
function getDeployedCampaigns() public view returns(address[]){
return deployedCampaign;
}
}

contract Campaign{

struct Request {
string description;
uint value;
address recepient;
bool complete;
mapping(address => bool) approved;
uint approvalCount;
}

Request[] public requests;
address public manager;
uint public miniumContribution ;
uint public totalContribution;

mapping(address => bool) public approvers;
uint public approversCount;

modifier onlyManager() {
require(msg.sender == manager);
_;
}

constructor(uint _minimum, address _manager) public {
miniumContribution = _minimum;
manager = _manager;
}
function contribute() public payable {
require(msg.value > miniumContribution && msg.sender != manager);
approvers[msg.sender] = true;
totalContribution += msg.value;
approversCount++;
}
function getTotalContribution() public view returns(uint){
return totalContribution;
}
function createRequest(string _description, uint _value, address _recipient) public onlyManager {
Request memory newRequest = Request({
description: _description,
value: _value,
recepient: _recipient,
complete: false,
approvalCount: 0
});
requests.push(newRequest);
}

function approveRequest(uint _index) public {
Request storage request = requests[_index];
require(
approvers[msg.sender] &&
!request.approved[msg.sender] &&
manager != msg.sender &&
!request.complete
);
request.approved[msg.sender] = true;
request.approvalCount++;
}

function finalizeRequest(uint _index) public onlyManager {
Request storage request = requests[_index];
require(!request.complete && request.approvalCount > (approversCount/2));
request.recepient.transfer(request.value);
request.complete = true;
}

function getSummary() public view returns(
uint, uint, uint, uint, address
) {
return (
miniumContribution,
this.balance,
requests.length,
approversCount,
manager
);
}

function getRequestsCount() public view returns (uint) {
return requests.length;
}

}