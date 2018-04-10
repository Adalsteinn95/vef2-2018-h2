import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAllUsers from '../../reducers/getAllUsers';
import { fetchUsers } from '../../actions/getAllUsers';

class UserPage extends Component {
    componentDidMount() {
        const { 
            dispatch 
        } = this.props;

        dispatch(fetchUsers('users'));
    }
    render() {

        const {
            users,
        } = this.props;

        console.info(users);
        return (
            <div>
                
            </div>
        );
    }
}

const maptstateToProps = (state) =>{

    return {
        users: state.getAllUsers.users,
    }
}

export default connect(maptstateToProps)(UserPage);