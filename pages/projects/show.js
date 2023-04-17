import React, { Component } from "react";
import { Grid, Segment,Image, Header,Button, GridColumn } from "semantic-ui-react";
import Layout from "../../components/Layout";
import Project from "../../contracts/project";
import web3 from "../../contracts/web3";
import Fund from "../../components/Fund";
import { Link } from "../../scripts/route";
var CryptoJS = require("crypto-js");

class showProject extends Component {
  static async getInitialProps(props) {
    const project = Project(props.query.address);
//encryption
    const summary = await project.methods.getDetails().call();
    console.log(summary);
    /*var bytes1 = CryptoJS.AES.decrypt(summary[0], 'my-secret-key@123');
    var decminimumContribution = JSON.parse(bytes1.toString(CryptoJS.enc.Utf8));
    var bytes2 = CryptoJS.AES.decrypt(summary[1], 'my-secret-key@123');
    var decbalance = JSON.parse(bytes2.toString(CryptoJS.enc.Utf8));
    var bytes3 = CryptoJS.AES.decrypt(summary[2], 'my-secret-key@123');
    var decrequestsCount = JSON.parse(bytes3.toString(CryptoJS.enc.Utf8));
    var bytes4 = CryptoJS.AES.decrypt(summary[3], 'my-secret-key@123');
    var decapproversCount = JSON.parse(bytes4.toString(CryptoJS.enc.Utf8));
    var bytes5 = CryptoJS.AES.decrypt(summary[4], 'my-secret-key@123');
    var decmanager = JSON.parse(bytes5.toString(CryptoJS.enc.Utf8));
    */
    var bytes6 = CryptoJS.AES.decrypt(summary[5], 'my-secret-key@123');
    var decname = JSON.parse(bytes6.toString(CryptoJS.enc.Utf8));
    var bytes7 = CryptoJS.AES.decrypt(summary[6], 'my-secret-key@123');
    var decdescription = JSON.parse(bytes7.toString(CryptoJS.enc.Utf8));
    var bytes8 = CryptoJS.AES.decrypt(summary[7], 'my-secret-key@123');
    var decimage = JSON.parse(bytes8.toString(CryptoJS.enc.Utf8));
    /*
    var bytes9 = CryptoJS.AES.decrypt(summary[8], 'my-secret-key@123');
    var dectarget = JSON.parse(bytes9.toString(CryptoJS.enc.Utf8));
    */
  
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
      target: summary[8]
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
      <Segment><Image src={image} /></Segment>
      <Segment ><Header>{name}</Header>{description}</Segment>
      <Segment><Header>Creator Address : {manager}</Header>The creator can transfer money from contract to organisations or people</Segment>
      </Grid.Column>
      <Grid.Column >
        <Segment><Header>Project Target : {target} Ether</Header>The amount of funds that needs to be generated</Segment>
        <Segment><Header>Minimum Contribution : {minimumContribution} Wei</Header>Minimum amount that can be sent to the contract</Segment>
        <Segment><Header>Funds Available : { web3.utils.fromWei(balance, "ether")} Ether</Header>Total funds generated</Segment>
        <Segment><Header>Total Contributors : {approversCount}</Header>Total Number of donators</Segment>
        <Segment><Header>Payments Made : {requestsCount}</Header>Total number of Payments made from this contract</Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  <Grid columns={2} divided>
  <Grid.Row stretched>
  <Grid.Column><Button basic color="grey" disabled={(balance/1000000000000000000)==target}><Fund address={this.props.address} /></Button></Grid.Column>
  <GridColumn >
  <br></br>
  <Link route={`/projects/${this.props.address}/payments`}><Button fluid basic color="grey">
    <Button size="massive" fluid primary>Transactions</Button>
    </Button>
  </Link>
  <br></br>
  </GridColumn>
  </Grid.Row>
  </Grid>
      </Layout>
    );
  }
}

export default showProject;
