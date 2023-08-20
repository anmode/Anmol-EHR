import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select } from 'semantic-ui-react';
import { Link } from '../../../backend/routes';
import { Router } from '../../../backend/routes';
import web3 from '../../../backend/server/web3';
import Layout from '../../components/Layout';
import record from '../../../backend/server/record';

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
    aadhaar: '',
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

      const patientDetails = await record.methods.searchPatientDemographic(patientAddress).call();
      this.setState({
        aadhaar: patientDetails.aadhaar,
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
      aadhaar,
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
          aadhaar,
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
      Router.pushRoute('/list');
    } catch (err) {
      this.setState({ errorMessage: err.message });
      alert('Failed to update account');
    }

    this.setState({
      loading: false,
      aadhaar: '',
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
                <label>Aadhaar Number</label>
                <Input
                  placeholder='Eg. 001234010234'
                  value={this.state.aadhaar}
                  onChange={(event) => this.setState({ aadhaar: event.target.value })}
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
            <br />
            <Form.Group widths='equal'>
              <Form.Field
                label='Gender'
                control={Select}
                options={options}
                value={this.state.gender}
                onChange={this.handleGender}
              />

              <Form.Field>
                <label>Date of Birth</label>
                <Input
                  placeholder='Eg. 01/01/1997'
                  value={this.state.dob}
                  onChange={(event) => this.setState({ dob: event.target.value })}
                />
              </Form.Field>

              <Form.Field>
                <label>Height</label>
                <Input
                  placeholder='Eg. 183'
                  label={{ basic: true, content: 'cm' }}
                  labelPosition='right'
                  value={this.state.height}
                  onChange={(event) => this.setState({ height: event.target.value })}
                />
              </Form.Field>

              <Form.Field>
                <label>Weight</label>
                <Input
                  placeholder='Eg. 65'
                  label={{ basic: true, content: 'kg' }}
                  labelPosition='right'
                  value={this.state.weight}
                  onChange={(event) => this.setState({ weight: event.target.value })}
                />
              </Form.Field>
            </Form.Group>

            <br />
            <Form.Group widths='equal'>
              <Form.TextArea
                label='House Address'
                placeholder='Eg. 1234, Jalan Seksyen 1/3, 31900 Kampar, Perak'
                value={this.state.houseaddr}
                onChange={(event) => this.setState({ houseaddr: event.target.value })}
              />
            </Form.Group>

            <br />
            <h2 style={{ marginTop: '20px', marginBottom: '30px' }}>Medical History</h2>
            <Divider clearing />
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Blood Group</label>
                <Input
                  placeholder='Eg. A-'
                  value={this.state.bloodgroup}
                  onChange={(event) => this.setState({ bloodgroup: event.target.value })}
                />
              </Form.Field>

              <Form.Field
                label='Allergies'
                control={Select}
                options={allergyOptions}
                value={this.state.allergies}
                onChange={this.handleAllergies}
              />
            </Form.Group>
            <br />
            <Form.Group widths='equal'>
              <Form.TextArea
                label='Current Medications'
                placeholder='Eg. Antidepressants'
                value={this.state.medication}
                onChange={(event) => this.setState({ medication: event.target.value })}
              />
            </Form.Group>

            <br />
            <h2 style={{ marginTop: '20px', marginBottom: '30px' }}>Emergency Contact</h2>
            <Divider clearing />
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Emergency Contact Name</label>
                <Input
                  placeholder='Eg. Taylor Smith'
                  value={this.state.emergencyName}
                  onChange={(event) => this.setState({ emergencyName: event.target.value })}
                />
              </Form.Field>

              <Form.Field>
                <label>Emergency Contact Phone</label>
                <Input
                  placeholder='Eg. 0124995002'
                  value={this.state.emergencyContact}
                  onChange={(event) => this.setState({ emergencyContact: event.target.value })}
                />
              </Form.Field>
            </Form.Group>
            <br />
            <Message error header='Oops!' content={this.state.errorMessage} />
            <Button primary loading={this.state.loading}>
              Edit
            </Button>
          </Form>
        </Segment>
      </Layout>
    );
  }
}

export default EditPatient;
