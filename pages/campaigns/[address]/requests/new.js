import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import Router from 'next/router';

class RequestNew extends Component {

    state = {
        value: '',
        description: '',
        recipient: '',
        loading: '',
        errorMessage: ''
    }

    static async getInitialProps(context) {
        const { address } = context.query;
        return { address };
    }

    onSubmit = async (event) => {
        event.preventDefault();
        
        this.setState({ loading: true, errorMessage: '' });
        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                    description, 
                    web3.utils.toWei(value, 'ether'), 
                    recipient
                ).send({
                    from: accounts[0]
                });
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <>
                <a
                    onClick={() => Router.push(`/campaigns/${this.props.address}/requests`)}
                >
                    Back
                </a>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={ event => this.setState({ description: event.target.value}) }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value={this.state.value}
                            onChange={ event => this.setState({ value: event.target.value}) }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={ event => this.setState({ recipient: event.target.value}) }
                        />
                    </Form.Field>
                    <Message
                        error
                        header="Ooops!"
                        content={this.state.errorMessage}
                    />
                    <Button
                        primary
                        loading={this.state.loading}
                    >
                        Create!
                    </Button>
                </Form>
            </>
        );
    }
}

export default RequestNew;