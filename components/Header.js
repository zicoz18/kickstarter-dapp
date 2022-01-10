import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import Router from "next/router";

const Header = () => {
    return (
        <Menu style={{ marginTop: '10px' }} >
            <Menu.Item onClick={() => Router.push("/")} >
                Crowd Coin
            </Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item>
                    Campaigns
                </Menu.Item>
                <Menu.Item onClick={() => Router.push("/campaigns/new")} >
                    <Icon name="add circle" />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

 export default Header;