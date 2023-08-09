import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import record from '../../../backend/server/record';
import web3 from '../../../backend/server/web3';
import { useRouter } from 'next/router';

const options = [
  { key: 'm', text: 'Male', value: 'Male' },
  { key: 'f', text: 'Female', value: 'Female' },
  { key: 'o', text: 'Other', value: 'Other' },
];

const allergyOptions = [
  { key: 'f', text: 'Food', value: 'Food' },
  { key: 'm', text: 'Medical', value: 'Medical' },
  { key: 'e', text: 'Environmental', value: 'Environmental' },
  { key: 'o', text: 'Others', value: 'Others' },
];

class EditPatient extends Component {
  state = {
    ic: '',
    name: '',
    phone: '',
    gender: '',
    dob: '',
    height: '',
    weight: '',
    houseaddr: '',
    bloodgroup: '',
    allergies: '',
    medication: '',
    emergencyName: '',
    emergencyContact: '',
    loading: false,
    errorMessage: '',
  };

  handleGender = (e, { value }) => this.setState({ gender: value });

  handleAllergies = (e, { value }) => this.setState({ allergies: value });

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();
      const patientAddress = accounts[0];

      const patientDetails = await record.methods.getPatient(patientAddress).call();
      this.setState({
        ic: patientDetails.ic,
        name: patientDetails.name,
        phone: patientDetails.phone,
        gender: patientDetails.gender,
        dob: patientDetails.dob,
        height: patientDetails.height,
        weight: patientDetails.weight,
        houseaddr: patientDetails.houseaddr,
        bloodgroup: patientDetails.bloodgroup,
        allergies: patientDetails.allergies,
        medication: patientDetails.medication,
        emergencyName: patientDetails.emergencyName,
        emergencyContact: patientDetails.emergencyContact,
      });
    } catch (err) {
      console.log(err);
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const {
      ic,
      name,
      phone,
      gender,
      dob,
      height,
      weight,
      houseaddr,
      bloodgroup,
      allergies,
      medication,
      emergencyName,
      emergencyContact,
    } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();

      await record.methods
        .editDetails(
          ic,
          name,
          phone,
          gender,
          dob,
          height,
          weight,
          houseaddr,
          bloodgroup,
          allergies,
          medication,
          emergencyName,
          emergencyContact
        )
        .send({ from: accounts[0] });

      alert('Account updated successfully!');
      const router = useRouter();
      router.push('/list');
    } catch (err) {
      this.setState({ errorMessage: err.message });
      alert('Failed to update account');
    }

    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <Layout>
        <Segment padded>
          <h1>Edit Record</h1>
        </Segment>
        <Segment>
          <h2 style={{ marginTop: '20px', marginBottom: '30px' }}>General Information</h2>
          <Divider clearing />
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>IC</label>
                <Input
                  placeholder='Eg. 001234010234'
                  value={this.state.ic}
                  onChange={(event) => this.setState({ ic: event.target.value })}
                />
              </Form.Field>

              <Form.Field>
                <label>Full Name</label>
                <Input
                  placeholder='Eg. John Smith'
                  value={this.state.name}
                  onChange={(event) => this.setState({ name: event.target.value })}
                />
              </Form.Field>

              <Form.Field>
                <label>Phone</label>
                <Input
                  placeholder='Eg. 0123456789'
                  value={this.state.phone}
                  onChange={(event) => this.setState({ phone: event.target.value })}
                />
              </Form.Field>
            </Form.Group>
            {/* ... Rest of the form ... */}
          </Form>
        </Segment>
      </Layout>
    );
  }
}

export default EditPatient;
