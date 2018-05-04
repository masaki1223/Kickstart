import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react'
import web3 from '../ethereum/web3.js';
import factory from '../ethereum/factory';
import Layout from '../components/Layout.js';
import { Link } from '../routes';

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map( (address) => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a> View Campaign </a>
                    </Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        return(
            <Layout>
                <div>
                    <h2>Open Campaigns </h2>

                    <Link route="/campaigns/new">
                        <a className="item">
                            <Button
                                floated="right"
                                content="Create Campaign"
                                icon="add circle"
                                primary
                                // *TODO: place on right side
                                // TODO: this is special because it gets imported during build.
                            />
                        </a>
                    </Link>

                    { this.renderCampaigns() }

                </div>
            </Layout>

        );
    }
}

export default CampaignIndex;