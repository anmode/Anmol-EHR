import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import record from '../../../backend/server/record';
import web3 from '../../../backend/server/web3';

class RegisterHospital extends Component {
    state = {
        reg_no: '',
        name: '',
        location: '',
        contact: '',
        loading: false,
        errorMessage: ''
    };

    onSubmit = async event => {
        event.preventDefault();

        const { reg_no, name, location, contact } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.setHospital(
                reg_no, name, location, contact
            ).send({ from: accounts[0] });

            alert("Hospital registered successfully!");
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("This Hospital is already registered");
        }

        this.setState({
            loading: false,
            reg_no: '',
            name: '',
            location: '',
            contact: ''
        });
    }

    render() {
        return (
            <Layout>
                <Segment padded><h1>Register New Hospital</h1></Segment>
                <Segment>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label>Registration Number</label>
                            <Input
                                placeholder='Eg. ABC123'
                                value={this.state.reg_no}
                                onChange={event =>
                                    this.setState({ reg_no: event.target.value })}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Name</label>
                            <Input
                                placeholder='Hospital Name'
                                value={this.state.name}
                                onChange={event =>
                                    this.setState({ name: event.target.value })}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Location</label>
                            <Input
                                placeholder='Hospital Location'
                                value={this.state.location}
                                onChange={event =>
                                    this.setState({ location: event.target.value })}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Contact</label>
                            <Input
                                placeholder='Hospital Contact'
                                value={this.state.contact}
                                onChange={event =>
                                    this.setState({ contact: event.target.value })}
                            />
                        </Form.Field>

                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <Button primary loading={this.state.loading}>Register</Button>
                    </Form>
                </Segment>
            </Layout>
        );
    }
}

export default RegisterHospital;
