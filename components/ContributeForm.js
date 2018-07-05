import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
  state = {
    value: "",
    errorMessage: "",
    success: false,
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);
    this.setState({ loading: true, errorMessage: "", success: false });

    try {
      const accounts = await web3.eth.getAccounts();
      if (accounts[0] !== this.props.manager) {
        await campaign.methods.contribute().send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, "ether")
        });
        Router.pushRoute(`/campaigns/${this.props.address}`);
        this.setState({ success: true });
      } else {
        this.setState({
          errorMessage: "You cannot contribute your own campaign!"
        });
      }
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, value: "" });
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        error={!!this.state.errorMessage}
        success={this.state.success}
      >
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Button
          primary
          loading={this.state.loading}
          disabled={this.state.loading}
        >
          Contribute!
        </Button>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Message
          success
          header="Successful Transaction!"
          content={"Your contribution has been successfully confirmed!"}
        />
      </Form>
    );
  }
}

export default ContributeForm;
