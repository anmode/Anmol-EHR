import React, { Component } from 'react';
import { Card, Input, Form } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../../backend/server/record';
// import web3 from '../../backend/server/web3';
import { Link } from '../../backend/routes';
import { Router } from '../../backend/routes';

class RecordsList extends Component {
    state = { 
        search: '' 
    };

    static async getInitialProps() {
        const allRecords = await record.methods.getPatients().call();

        return { allRecords };
    }

    renderRecords() {
        const items = this.props.allRecords.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/record/${address}`}>
                        <a>View Record</a>
                    </Link>
                ),
                fluid: true
            };
        });
        //Add all records to card group
        return <Card.Group items={items} />;
    }

    onSearch = async event => {
        event.preventDefault(); //prevent browser from submitting form to back end server

        Router.pushRoute(`/record/${this.state.search}`);
    };

    render() {
        return (
            <Layout>
                <div>
                   
                    <Form onSubmit={this.onSearch}> 
                        <Form.Field>
                            <Input 
                                fluid 
                                action={{ icon: 'search' }} 
                                placeholder='Search...' 
                                onChange={(event) => this.setState({ search: event.target.value })}
                            /><br/>
                        </Form.Field>
                    </Form>
                     <h2>Medical Records List</h2>
                    {this.renderRecords()}
                </div>
            </Layout>
        );
    }
}

export default RecordsList;