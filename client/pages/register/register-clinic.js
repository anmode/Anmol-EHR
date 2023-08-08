import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import record from '../../../backend/server/record';
import web3 from '../../../backend/server/web3';

class RegisterClinic extends Component {
    state = {
        reg_no: '',
        loading: false,
        errorMessage: ''
    };

    onSubmit = async event => {
        event.preventDefault();

        const { reg_no } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();

            await record.methods.setClinic(
                reg_no
            ).send({ from: accounts[0] });

            alert("Clinic registered successfully!");
        }
        catch (err) {
            this.setState({ errorMessage: err.message });
            alert("This Clinic is already registered");
        }

        this.setState({ loading: false, reg_no: ''});
    }

    render() {
        return (
            <Layout>
                <Segment padded><h1>Register New Clinic</h1></Segment>
                <Segment>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label>Registration Number</label>
                            <Input
                                placeholder='Eg. XYZ456'
                                value={this.state.reg_no}
                                onChange={event =>
                                    this.setState({ reg_no: event.target.value })}
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

export default RegisterClinic;