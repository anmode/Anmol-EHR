import React, { Component } from 'react';
import { Form, Input, Button, Segment, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import record from '../../ethereum/record';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class EditHospital extends Component {
    state = {
        reg_no: '',
        name: '',
        location: '',
        contact: '',
        loading: false,
        errorMessage: ''
    };

    async componentDidMount() {
        try {
            const accounts = await web3.eth.getAccounts();
            const hospitalAddress = this.props.match.params.hospitalAddress; // Assuming you have the hospital's Ethereum address as a URL parameter.

            const hospitalDetails = await record.methods.getHospital(hospitalAddress).call();
            this.setState({
                reg_no: hospitalDetails.reg_no,
                name: hospitalDetails.name,
                location: hospitalDetails.location,
                contact: hospitalDetails.contact
            });
        } catch (err) {
            console.log(err);
        }
    }

    onSubmit = async event => {
        event.preventDefault();

        const { reg_no, name, location, contact } = this.state;

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            const hospitalAddress = this.props.match.params.hospitalAddress; // Assuming you have the hospital's Ethereum address as a URL parameter.

            await record.methods.editHospital(hospitalAddress, reg_no, name, location, contact).send({ from: accounts[0] });

            alert("Hospital details updated successfully!");
            Router.pushRoute('/list'); // Assuming you want to redirect to a list page after updating the hospital.
        } catch (err) {
            this.setState({ errorMessage: err.message });
            alert("An error has occurred");
        }

        this.setState({ loading: false, reg_no: '', name: '', location: '', contact: '' });
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

                        <Form.Field>
                            <label>Name</label>
                            <Input
                                placeholder='Hospital Name'
                                value={this.state.name}
                                onChange={event => this.setState({ name: event.target.value })}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Location</label>
                            <Input
                                placeholder='Hospital Location'
                                value={this.state.location}
                                onChange={event => this.setState({ location: event.target.value })}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Contact</label>
                            <Input
                                placeholder='Hospital Contact'
                                value={this.state.contact}
                                onChange={event => this.setState({ contact: event.target.value })}
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
