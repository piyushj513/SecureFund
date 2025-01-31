import React from 'react';
import blockImg from '../public/images/banner.jpg';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';

const About = () => {
  return (
    <>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                We Help Companies and Organisations
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                We can give your company superpowers to do things that they
                never thought possible. Let us delight your customers and
                empower your needs.
              </p>
              <Header as="h3" style={{ fontSize: '2em' }}>
                We Make Secure Funding Apps
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Yes that&apos;s right, we make decentralized app using
                blockchain to provide safe funding services.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image bordered rounded size="large" src={blockImg.src} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button size="huge" href="#">
                Check Them Out
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                &quot;Great Application&quot;
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                That is what they all say about us
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as="h3" style={{ fontSize: '2em' }}>
                &quot;They really helped my company&quot;
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                <Icon name="user secret" />
                Our Users
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: '2em' }}>
            Start by creating a new project
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Create a new project by entering details and uploading image.
            Generate funds and make payments in a completely safe and
            transparent method.
          </p>
          <Button as="a" size="large" href="#">
            Read More
          </Button>
        </Container>
      </Segment>
    </>
  );
};
export default About;
