import React from 'react';


class PageError extends React.Component {
    render() {
        const { message } = this.props;
        return (
            <>
                <h2>Error has occurred</h2>
                <h3>{message}</h3>
            </>
        );
    }
}


export default PageError;