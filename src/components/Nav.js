import React from 'react';
const { Drawer, Button } = antd;
import { NavLink } from 'react-router-dom';


function SideBar() {
    return (
        <div>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
            <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={this.onClose}
                visible={this.state.visible}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </div>
    )
}


export default SideBar;