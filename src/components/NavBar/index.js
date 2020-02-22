import React from 'react';
import { Menu, Icon } from 'antd';
import '../../style/css/navbar.css';

function NavBar(props) {
    return (
        <Menu mode="horizontal">
            <Menu.Item id="search">
                <Icon type="mail" />
                Navigation One
            </Menu.Item>
            <Menu.Item id="brand">
                <Icon type="appstore" />
                Navigation Two
            </Menu.Item>
            <Menu.Item id="navogation">
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    Navigation Four - Link
          </a>
            </Menu.Item>
        </Menu>
    );
}

export default NavBar;