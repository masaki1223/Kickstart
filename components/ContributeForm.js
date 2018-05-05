import React, { Component } from 'react';
import { Form, Input, Message, Button} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        loading: false
    }

    onSubmit = async event => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            if(accounts[0] == this.props.manager) { console.log('You cannot contribute to your own campaign!');}
            this.setState({ loading: true })
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            Router.pushRoute(`/campaigns/${this.props.address}`);
            this.setState({ loading: false });
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                        label="ether"
                        labelPosition="right"
                    />
                </Form.Field>
                <Button primary loading={this.state.loading} disabled={this.state.loading}>
                    Contribute!
                </Button>
            </Form>
        );

    }
}

export default ContributeForm;