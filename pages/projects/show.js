import React, { Component } from 'react';
import {
  Grid,
  Segment,
  Image,
  Header,
  Button,
  GridColumn,
  SegmentGroup,
} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Project from '../../contracts/project';
import web3 from '../../contracts/web3';
import Fund from '../../components/Fund';
import { Link } from '../../scripts/route';
var CryptoJS = require('crypto-js');

class ShowProject extends Component {
  static async getInitialProps(props) {
    const project = Project(props.query.address);

    // Fetch project details
    const summary = await project.methods.getDetails().call();
    console.log(summary);

    // Decrypt necessary data
    const decname = JSON.parse(
      CryptoJS.AES.decrypt(summary[5], 'my-secret-key@123').toString(
        CryptoJS.enc.Utf8
      )
    );
    const decdescription = JSON.parse(
      CryptoJS.AES.decrypt(summary[6], 'my-secret-key@123').toString(
        CryptoJS.enc.Utf8
      )
    );
    const decimage = JSON.parse(
      CryptoJS.AES.decrypt(summary[7], 'my-secret-key@123').toString(
        CryptoJS.enc.Utf8
      )
    );

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      name: decname,
      description: decdescription,
      image: decimage,
      target: summary[8],
    };
  }

  render() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
      name,
      description,
      image,
      target,
    } = this.props;

    return (
      <Layout>
        <h3 className="open-campaigns">Project Details</h3>

        <Grid columns={2} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <SegmentGroup>
                <Segment>
                  <Image src={image}/>
                </Segment>
                <Segment>
                  <Header>{name}</Header>
                  {description}
                </Segment>
                <Segment>
                  <Fund address={this.props.address} />
                </Segment>
              </SegmentGroup>
            </Grid.Column>

            <Grid.Column>
              <Segment>
                <Header>Creator Address: {manager}</Header>
                The creator can transfer money from the contract to
                organizations or individuals.
              </Segment>
              <Segment>
                <Header>Project Target: {target} Ether</Header>
                The amount of funds that needs to be generated.
              </Segment>
              <Segment>
                <Header>Minimum Contribution: {minimumContribution} Wei</Header>
                Minimum amount that can be sent to the contract.
              </Segment>
              <Segment>
                <Header>
                  Funds Available: {web3.utils.fromWei(balance, 'ether')} Ether
                </Header>
                Total funds generated.
              </Segment>
              <Segment>
                <Header>Total Contributors: {approversCount}</Header>
                Total number of donators.
              </Segment>
              <Segment>
                <Header>Payments Made: {requestsCount}</Header>
                Total number of payments made from this contract.
              </Segment>
              <Segment>
                <Header>
                  <Link
                    href={`https://testnet.snowtrace.io/address/${this.props.address}`}
                    target="_blank"
                  >
                    View Transactions
                  </Link>
                </Header>
                View the Transaction details on the blockchain network
              </Segment>
              <Segment>
                <Link route={`/projects/${this.props.address}/payments`}>
                  <Button size="big" fluid primary>
                    Transfer Money
                  </Button>
                </Link>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default ShowProject;
