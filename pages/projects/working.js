import Layout from '@/components/Layout';
import { Grid, Header, Segment } from 'semantic-ui-react';
import crtImg from '../../public/images/create.png';
import reqImg from '../../public/images/req.png';
import viewImg from '../../public/images/view.png';
import transImg from '../../public/images/transfer.png';

const working = () => {
  return (
    <Layout>
      <Segment vertical style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid centered>
          <h3 className="working open-campaigns">How SecureFund Works</h3>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={8}>
              <div className="working-item" style={{ textAlign: 'center' }}>
                <img className="working-image" src={crtImg.src} alt="Create Project" style={{ maxWidth: '100%', height: 'auto' }} />
                <div>
                  <Header as="h4" color="blue">Create a Project for Raising Funds</Header>
                  <p>Create a new project by entering details and uploading image.</p>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={12} computer={8}>
              <div className="working-item" style={{ textAlign: 'center' }}>
                <img className="working-image" src={viewImg.src} alt="View Projects" style={{ maxWidth: '100%', height: 'auto' }} />
                <div>
                  <Header as="h4" color="blue">View Active Projects</Header>
                  <p>All the active projects and their details can be viewed such as payments made from the contract to others.</p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={12} computer={8}>
              <div className="working-item" style={{ textAlign: 'center' }}>
                <img className="working-image" src={reqImg.src} alt="Fund Project" style={{ maxWidth: '100%', height: 'auto' }} />
                <div>
                  <Header as="h4" color="blue">Fund Project</Header>
                  <p>Fund the active projects using crypto wallets.</p>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={12} computer={8}>
              <div className="working-item" style={{ textAlign: 'center' }}>
                <img className="working-image" src={transImg.src} alt="Transfer Funds" style={{ maxWidth: '100%', height: 'auto' }} />
                <div>
                  <Header as="h4" color="blue">Transfer Funds</Header>
                  <p>Transfer the money collected to other parties and organisations.</p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Layout>
  );
};
export default working;
