// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


contract ProjectFactory {

    address payable[] public deployedProjects; //  stores the addresses of all the deployed campaigns
    //memory: temp storage, gets deleted when execution stops
    function createProject(uint minimum,string memory name,string memory description,string memory image,uint target) public {
        //create the new campaign with passed arguments
        address newProject = address(new Project(minimum, msg.sender,name,description,image,target));
        deployedProjects.push(payable(newProject));   // push: add new campaign to the deployedCampaigns array
    }

    // view function: read values outside contract
    function getDeployedProjects() public view returns (address payable[] memory) {
        return deployedProjects;
    }
}

// Main contract
contract Project{

    struct Payment {
        string description;
        uint value;
        address recipient; // address on blockchain
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;  // mapping address to boolean to check if request approved or not
    }
    // visibility : public (accessible outside contract)
    Payment[] public payments; 
    address public creator;
    mapping(address => bool) public approvers;  // mapping address to boolean to check approvers
    uint public approversCount;
    uint public minimumContribution;
    string public ProjectName;
    string public ProjectDescription;
    string public imageUrl;
    uint public projectTarget;
    modifier restricted() {
        require(msg.sender == creator);    // msg.sender: person calling the function
        _;
    }
    // constructor : run only once when contract is initialized or deployed on blockchain
    constructor (uint minimum, address _creator,string memory name,string memory description,string memory image,uint target) {
        creator = _creator;
        minimumContribution = minimum;
        ProjectName=name;
        ProjectDescription=description;
        imageUrl=image;
        projectTarget=target;
    }
    // payable: to send cryptcurrencies to contract
    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;   // set sender as campaign approver
        approversCount++;   // msg.value: amount of crypto sent
    }
    // function for creating request to transfer crypto
    function createPayment(string memory description, uint value, address recipient) public restricted {
        //storage: permanent storage
        Payment storage newPayment = payments.push();   // add new request to request array
        newPayment.description = description;
        newPayment.value= value;
        newPayment.recipient= recipient;
        newPayment.complete= false;
        newPayment.approvalCount=0;    // initial status is false
    }

    function approveRequest(uint index) public {

        Payment storage payment = payments[index];
        require(approvers[msg.sender]); 
        require(!payment.approvals[msg.sender]);
        payment.approvals[msg.sender] = true; // request is approved by donatrs
        payment.approvalCount++;
    }


    // function to make the payment to recipient address
    function MakePayment(uint index) public restricted {

        Payment storage payment = payments[index];
        // minimum num of approvers needed to make payment
        require(payment.approvalCount >= 1);
        require(!payment.complete);
        payable(payment.recipient).transfer(payment.value);    // payment to recipient
        payment.complete = true;
    }
    // function to get details about the campaign
    function getDetails() public view returns (uint, uint, uint, uint, address,string memory,string memory ,string memory,uint) {
        return (
          minimumContribution,
          address(this).balance, // this: balance of current contract
          payments.length,
          approversCount,
          creator,
          ProjectName,
          ProjectDescription,
          imageUrl,
          projectTarget
        );
    }
    // function to get total number of requests to make payment
    function getPayments() public view returns (uint) {
        return payments.length;
    }

}