import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Router from "next/router";

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        // to not allow web browser to automaticly try to submit the form to our backend
        event.preventDefault();

        this.setState({ loading: true, errorMessage:'' });
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
            Router.push('/');
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <>
                <h3>Create a Campaign!</h3>
                {/* If you do not place the error property on the form compoenent then Message will not be rendered */}
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label='wei' 
                            labelPosition='right'
                            value={this.state.minimumContribution}
                            onChange={ event => this.setState({ minimumContribution: event.target.value }) }
                        />
                    </Form.Field>
                    <Message
                        error
                        header="Ooops!"
                        content={this.state.errorMessage}
                    />
                    <Button 
                        loading={this.state.loading}
                        primary 
                    >
                        Create
                    </Button>
                </Form>
            </>
        )
    }
}

export default CampaignNew;
