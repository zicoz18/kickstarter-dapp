import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Router from "next/router";


class CampaignIndex extends Component {

    /*  
    Next is Server Side Rendering which means that it kind of runs our code and creates an html in the server
    than give our code to the user. (By the way in classic react, we simply give our code to the user and it works on the browser not on the server)
    For next js to fetch necessary data but do not render the component (it actually renders the compoenent) it uses a specific function presented by next
    this function's name is getInitialProps. Since it should not create the component and render it it should be static.
    So next js fetches the data server side 
    And it gets the data and gives the return object of the function as props to the Componenet
    */
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map((address) => (
            {
                header: address,
                description: (
                    <a 
                        onClick={() => Router.push(`campaigns/${address}`)}
                    >
                        View Campaign
                    </a>
                    ),
                fluid: true
            }
        ));

        return <Card.Group items={items} />;
    }

    render() {
        return (
                <div>
                    <h3>Open Campaigns</h3>
                    {/*       
                    In this one althouh button is floating since campaign are being rendered beforehadn it only gets to right
                    therefore, we should render button before and campaign latter              
                    {this.renderCampaigns()}
                    <Button 
                        floated="right"
                        content="Create Campaign"
                        icon="add circle"
                        primary
                    />
                     */}
                    <Button 
                        floated="right"
                        content="Create Campaign"
                        icon="add circle"
                        primary
                        /* same as primary={true} */
                        onClick={() => Router.push("/campaigns/new")}
                    />
                    {this.renderCampaigns()}



                </div>

        ) 
    }
}

export default CampaignIndex;