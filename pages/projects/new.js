import React, { Component } from 'react';
import { Form, Button, Input, Message, Segment } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../contracts/factory';
import web3 from '../../contracts/web3';
import { Router } from '../../scripts/route';
var CryptoJS = require('crypto-js');

class newProject extends Component {
  state = {
    minimumContribution: '',
    description: '',
    projectName: '',
    target: '',
    imageUrl: '',
    errorMessage: '',
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });

    try {
      //var minimumContribution = CryptoJS.AES.encrypt(JSON.stringify(this.state.minimumContribution), 'my-secret-key@123').toString();
      var projectName = CryptoJS.AES.encrypt(
        JSON.stringify(this.state.projectName),
        'my-secret-key@123'
      ).toString();
      var description = CryptoJS.AES.encrypt(
        JSON.stringify(this.state.description),
        'my-secret-key@123'
      ).toString();
      var imageUrl = CryptoJS.AES.encrypt(
        JSON.stringify(this.state.imageUrl),
        'my-secret-key@123'
      ).toString();
      //var target = CryptoJS.AES.encrypt(JSON.stringify(this.state.target), 'my-secret-key@123').toString();
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createProject(
          this.state.minimumContribution,
          projectName,
          description,
          imageUrl,
          this.state.target
        )
        .send({
          from: accounts[0],
        });
      Router.pushRoute('/main');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <h3 className="open-campaigns">Create Project</h3>
        <Segment padded="very">
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Project Name</label>
              <Input
                value={this.state.projectName}
                onChange={(event) =>
                  this.setState({ projectName: event.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Project Description</label>
              <Input
                value={this.state.description}
                onChange={(event) =>
                  this.setState({ description: event.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Image Url</label>
              <Input
                value={this.state.imageUrl}
                onChange={(event) =>
                  this.setState({ imageUrl: event.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Minimum Contribution</label>
              <Input
                label="Wei"
                labelPosition="right"
                value={this.state.minimumContribution}
                onChange={(event) =>
                  this.setState({ minimumContribution: event.target.value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Target</label>
              <Input
                label="Ether"
                labelPosition="right"
                value={this.state.target}
                onChange={(event) =>
                  this.setState({ target: event.target.value })
                }
              />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary>
              Create!
            </Button>
          </Form>
        </Segment>
      </Layout>
    );
  }
}

export default newProject;
