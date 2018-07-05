import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

class NewRequest extends Component {
  state = {
    description: "",
    value: "",
    recipient: "",
    errorMessage: "",
    success: false,
    loading: false
  };

  static getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }
  onSubmit = async event => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;
    this.setState({ loading: true, errorMessage: "", success: false });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0]
        });
      this.setState({ success: true });
      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>
        <Form
          onSubmit={this.onSubmit}
          error={!!this.state.errorMessage}
          success={this.state.success}
        >
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={e => {
                this.setState({ description: e.target.value });
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount in Ether</label>
            <Input
              value={this.state.value}
              onChange={e => {
                this.setState({ value: e.target.value });
              }}
              label="ether"
              labelPosition="right"
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={e => {
                this.setState({ recipient: e.target.value });
              }}
            />
          </Form.Field>

          <Button
            primary
            loading={this.state.loading}
            disabled={this.state.loading}
          >
            Create
          </Button>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Message
            success
            header="Successful Transaction!"
            content={"New request has been successfully added!"}
          />
        </Form>
      </Layout>
    );
  }
}

export default NewRequest;
