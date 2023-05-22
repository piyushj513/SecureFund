import React, { Component } from "react";
import { Card, Button, Visibility } from "semantic-ui-react";
import factory from "../../contracts/factory";
import { Link } from "../../scripts/route";
import Project from "../../contracts/project";
import Layout from "@/components/Layout";
var CryptoJS = require("crypto-js");
class openProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      summary: null,
    };
  }
  static async getInitialProps() {
    const projects = await factory.methods.getDeployedProjects().call();
    return { projects };
  }
  async componentDidMount() {
    const c = Project(this.props.projects[0]);
    const summary = await Promise.all(
      this.props.projects.map((c, i) =>
        Project(this.props.projects[i]).methods.getDetails().call()
      )
    );
    this.setState({ summary });
    console.log(summary)
  }
  renderProjects() {
    let summ;
    const items = this.props.projects.map((address, i) => {
      if (this.state.summary) summ = this.state.summary[i];
      else summ = {0:"null", 5: "null", 7: "null", 8: "null" };
      const img = (CryptoJS.AES.decrypt(summ[7],'my-secret-key@123').toString(CryptoJS.enc.Utf8)).replace(/['"]+/g, '');
      const hdr = (CryptoJS.AES.decrypt(summ[5], 'my-secret-key@123').toString(CryptoJS.enc.Utf8)).replace(/['"]+/g, '');
      return {
        key: i,
        image: <img src={img} width="100%" height="100%"/>,
        header: hdr,
        meta: `👤 ` + address,
        description: (
    <div>
    <hr></hr>
    <br></br>
      <div>
      <div>
      <Button floated="left" basic color='green'>
        Target : {summ[8]} Ether
      </Button>
      <Button floated="right" basic color='red'>
        Minimum : {summ[0]} Wei
      </Button>
      <br></br>
      </div>
      <br></br>
      <Button basic fluid color={(summ[1]/1000000000000000000)<summ[8] ? 'red' : 'green'}>
       Funds Available : {summ[1]/1000000000000000000} ether
      </Button>
      <Button fluid color={(summ[1]/1000000000000000000)<summ[8] ? 'red' : 'green'}>Project Status : {(summ[1]/1000000000000000000)<summ[8] ? 'Pending' : 'Completed'}</Button>
      <br></br>
      </div>
        <Link route={`/projects/${address}`}>
              <Button attached='bottom' inverted color='blue' size="big">
              View Project
              </Button>
         </Link>
    </div>
        ),
        fluid: true,
        style: { overflowWrap: "break-word" },
      };
    });
    return (<Card.Group itemsPerRow={3} items={items}/>);
  }
  render() {
    return (
      <Layout>
           <div className="open-capaigns-box">
              <h3 className="open-campaigns">Open Projects</h3>
              <br></br>
            </div>
            {this.renderProjects()}
     </Layout>
    );
  }
}

export default openProject;
