import React, { Component } from 'react';
import { Card, Input, Form } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../../backend/server/record';
import { Link } from '../../backend/routes';
import { useRouter } from 'next/router';

class RecordsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }

    static async getInitialProps() {
        const allRecords = await record.methods.getPatients().call();

        return { allRecords };
    }

    onSearch = async event => {
        event.preventDefault(); // Prevent browser from submitting form to backend server

        const { search } = this.state;
        const router = useRouter();

        if (search) {
            router.push(`/record/${search}`);
        }
    };

    renderRecords() {
        const items = this.props.allRecords.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/record/${address}`} key={address}>
                        <a>View Record</a>
                    </Link>
                ),
                fluid: true,
            };
        });
        // Add all records to card group
        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <div>
                    <Form onSubmit={this.onSearch}>
                        <Form.Field>
                            <Input
                                fluid
                                action={{ icon: 'search' }}
                                placeholder="Search..."
                                value={this.state.search}
                                onChange={event => this.setState({ search: event.target.value })}
                            />
                            <br />
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
