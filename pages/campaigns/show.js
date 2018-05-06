import React, { Component } from 'react';
import web3 from '../../ethereum/web3';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import { Link } from '../../routes';
import ContributeForm from '../../components/ContributeForm';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        //get url token by props.query.address
        const campaign = Campaign(props.query.address);
        // returns arrays of 5 value
        // not organized with key name
        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money.',
                style: { overflowWrap: 'break-word'},
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become a contributor.',
                style: { overflowWrap: 'break-word'},
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers',
                style: { overflowWrap: 'break-word'},
            },
            {
                header: approversCount,
                meta: 'Numbers of Approvers',
                description: 'Number of people who have already donated to this campaign.',
                style: { overflowWrap: 'break-word'},
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend',
                style: { overflowWrap: 'break-word'},
            },


        ];

        return <Card.Group items={items} />;
    }

    render() {

        return (
            <Layout>

                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}

                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} manager={this.props.manager}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}><a><Button primary>View Requests</Button></a></Link>
                            <Link route={`/campaigns/${this.props.address}/requests/new`}><a><Button color="olive">Create A New Request</Button></a></Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;