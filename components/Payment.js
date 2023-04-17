import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../contracts/web3";
import Project from "../contracts/project";
import { Router } from "../scripts/route";
class Payment extends Component {
  onApprove = async () => {
    const campaign = Project(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    });
    Router.pushRoute(`/projects/${this.props.address}/payments`);
  };

  onFinalize = async () => {
    const campaign = Project(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.MakePayment(this.props.id).send({
      from: accounts[0],
    });
    Router.pushRoute(`/projects/${this.props.address}/payments`);
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount >=1;
    const reqapproval = (readyToFinalize?'Approved':'Pending')
    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {reqapproval}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button disabled={request.approvalCount >= 1 ? 'disabled' : ''} color="blue" onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="green" onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default Payment;
