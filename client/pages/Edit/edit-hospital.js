import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message } from 'semantic-ui-react';
import { Link } from '../../../backend/routes';
import { Router } from '../../../backend/routes';
import web3 from '../../../backend/server/web3';
import Layout from '../../components/Layout';
import record from '../../../backend/server/record';

class EditHospital extends Component {
    state = {
        reg_no: '',
        loading: false,
        errorMessage: ''
    };

    async componentDidMount() {
        try {
            const accounts = await web3.eth.getAccounts();
            const hospitalAddress = this.props.match.params.hospitalAddress; // Assuming you have the hospital's Ethereum address as a URL parameter.

            const hospitalDetails = await record.methods.getHospital(hospitalAddress).call();
            this.setState({ reg_no: hospitalDetails.reg_no });
        } catch (err) {
            console.log(err);
        }
    }

    onSubmit = async event => {
        event.preventDefault();

        const { reg_no } = this.state;

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            const hospitalAddress = this.props.match.params.hospitalAddress; // Assuming you have the hospital's Ethereum address as a URL parameter.

            await record.methods.editHospital(hospitalAddress, reg_no).send({ from: accounts[0] });

            alert("Hospital details updated successfully!");
            Router.pushRoute('/list'); // Assuming you want to redirect to a list page after updating the hospital.
        } catch (err) {
            this.setState({ errorMessage: err.message });
            alert("An error has occurred");
        }

        this.setState({ loading: false, reg_no: '' });
    }

    render() {
        return (
            <Layout>
                <Segment padded><h1>Edit Hospital Details</h1></Segment>
                <Segment>
                    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label>Registration Number</label>
                            <Input
                                placeholder='Eg. ABC123'
                                value={this.state.reg_no}
                                onChange={event => this.setState({ reg_no: event.target.value })}
                            />
                        </Form.Field>

                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <Button primary loading={this.state.loading}>Update</Button>
                    </Form>
                </Segment>
            </Layout>
        );
    }
}

export default EditHospital;
