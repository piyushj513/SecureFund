import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../scripts/route';
import Layout from '../../../components/Layout';
import Project from '../../../contracts/project';
import Payment from '../../../components/Payment';

class paymentIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const project = Project(address);
    const requestCount = await project.methods.getPayments().call();
    const approversCount = await project.methods.approversCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return project.methods.payments(index).call();
        })
    );

    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <Payment
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3 className="open-campaigns">Transactions</h3>
        <Link route={`/projects/${this.props.address}/payments/new`}>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Status</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} Transactions.</div>
      </Layout>
    );
  }
}

export default paymentIndex;
