import React from 'react';
import { Drawer, Button, Icon } from 'antd';

import NavLinks from './NavLinks';
import Auth from './Auth';


class SideBar extends React.Component {
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
            <>
                <Button type="primary" onClick={this.toggleVisible} style={{
                        zIndex: '10',
                        position: 'fixed',
                        margin: '10px'
                    }}>
                    <Icon type="menu" />
                </Button>
                <Drawer
                    title="Navigation"
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    zIndex='9'
                    headerStyle={{padding: '50px'}}
                >
                    <NavLinks />
                    <Auth />
                </Drawer>
            </>
        )
    }
}


export default SideBar;