import React from 'react';
import { Drawer, Button, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

import NavLinks from './NavLinks';
import Auth from './Auth';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }
    
    toggleVisible = () => {
        this.setState((prevState) => ({
            visible: !prevState.visible
        }));
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.toggleVisible} style={{zIndex: '10'}}>
                    <Icon type="menu" />
                </Button>
                <Drawer
                    title="Navigation"
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    zIndex='9'
                >
                    <NavLinks />
                    <Auth />
                </Drawer>
            </div>
        )
    }
}


export default Header;