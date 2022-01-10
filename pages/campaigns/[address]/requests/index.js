import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import Router from "next/router";
import Campaign from '../../../../ethereum/campaign';
import RequestRow from '../../../../components/RequestRow';


class RequestIndex extends Component {

    static async getInitialProps(context) {
        const address = context.query.address;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => (
                    campaign.methods.requests(index).call()
                ))
        );

        // by returning we add this object to props
        return { address, requests, requestCount, approversCount };
    }

    renderRows() {
        return this.props.requests.map((request, index) => (
            <RequestRow 
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />
        ));
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <>            
                <h3>Requests</h3>
                <a
                onClick={() => Router.push(`/campaigns/${this.props.address}/requests/new`)}
                >
                    <Button 
                        primary 
                        floated="right"
                        style={{ marginBottom: 10 }}
                    >
                        Add Request
                    </Button>
                </a>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.requestCount} requests</div>
            </>
        );
    }
}

export default RequestIndex;