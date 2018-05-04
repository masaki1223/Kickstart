import React, { Component } from 'react';
import { Form, Button, Input, Dropdown, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout.js';
import factory from '../../ethereum/factory.js';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false,
        disabled: false

    };
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, disabled: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });

            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message }) ;
        }

        this.setState({ loading: false, disabled: false });

    };

    render() {
        const options = [
            { key: 'wei', text: 'wei', value: 'wei' },
            { key: 'gwei', text: 'gwei', value: 'gwei' },
            { key: 'ether', text: 'ether', value: 'ether' },
        ];
        return(
         <Layout>
         <h2>Create Campaign!</h2>

             <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                 <Form.Field>
                     <label>Minimum Contribution</label>

                     <Input
                         label={<Dropdown defaultValue='wei' options={options}/>}
                         labelPosition="right"
                         value={this.state.minimumContribution}
                         onChange={event =>
                             this.setState({ minimumContribution: event.target.value })}
                     />
                 </Form.Field>

                 <Message error header="Oops!" content={this.state.errorMessage} />

                 <Button loading={this.state.loading} disabled={this.state.disabled} primary>Create!</Button>
             </Form>
         </Layout>
        );
    }
}

export default CampaignNew;