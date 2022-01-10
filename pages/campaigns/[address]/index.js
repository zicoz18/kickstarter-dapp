// import Router from "next/router";
import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import ContributeForm from '../../../components/ContributeForm';
import Router from "next/router";


class CampaignShow extends Component {
    static async getInitialProps(context) {
        const address = context.query.address;
        const campaign = await Campaign(address);
        const summary = await campaign.methods.getSummary().call();
        // summary is not an array it is an object 
        /* 
        Result {
            '0': '100',
            '1': '0',
            '2': '0',
            '3': '0',
            '4': '0x4662eEa6A925f5514325B792dF98dbF25894cFAE'
        }
        */
       // Returning this object add them to the props
        return { 
            address: context.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
         };
    }

    renderCards () {
        const { minimumContribution, balance, requestCount, approversCount, manager } = this.props;

        const items = [
            {
              header: manager,
              meta: 'Address of Manager',
              description: 
                'The manager created this campaign and can create request to withdraw money',
              /* 
                Card.Item also takes an optional property which is style
                The address of the manager overflows right of the card therefore we add this css property

                If you wanted your card to expend to make sure that address is in single line and is not overflowing,
                flow: true // actually does not work???
              */
              style: { overflowWrap: 'break-word' }
            } ,
            {
              header: minimumContribution,
              meta: 'Minimum Contribution (wei)',
              description:
                'You must contribute at least this much wei to become an approver',
            },
            {
              header: requestCount,
              meta: 'Number of Requests',
              description:
                'A request tries to withdraw money from the contract. Requests must be approved by appprovers',
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description:
                  'Number of people who have already donated to this campaign',
            },            
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description:
                  'The balance is how much money this campaign has left to spend',
            }
        ];

        return <Card.Group items={items} /> ;
    }

    render() {
        return (
            <>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10} >
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6} >
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <a
                                onClick={() => Router.push(`/campaigns/${this.props.address}/requests`)}
                            >
                                <Button primary >
                                    View Requests
                                </Button>
                            </a>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        );
    }
}

export default CampaignShow;