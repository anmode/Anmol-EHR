import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select } from 'semantic-ui-react';
import { Link } from '../../../backend/routes';
import { Router } from '../../../backend/routes';
import web3 from '../../../backend/server/web3';
import Layout from '../../components/Layout';
import record from '../../../backend/server/record';
const genderOptions = [
  { key: 'm', text: 'Male', value: 'Male' },
  { key: 'f', text: 'Female', value: 'Female' },
  { key: 'o', text: 'Other', value: 'Other' },
];

const qualificationOptions = [
  { key: 'h', text: 'Higher Certificate/SPM', value: 'Higher Certificate/SPM' },
  { key: 'd', text: 'Diploma', value: 'Diploma' },
  { key: 'b', text: 'Bachelor\'s Degree', value: 'Bachelor\'s Degree' },
  { key: 'm', text: 'Master\'s Degree', value: 'Master\'s Degree' },
  { key: 'dd', text: 'Doctoral Degree', value: 'Doctoral Degree' },
];

class EditDoctor extends Component {
  state = {
    aadhaar: '',
    name: '',
    phone: '',
    gender: '',
    dob: '',
    qualification: '',
    major: '',
    loading: false,
    errorMessage: '',
  };

  handleGender = (e, { value }) => this.setState({ gender: value });

  handleQualification = (e, { value }) => this.setState({ qualification: value });

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();
      const doctorAddress = accounts[0];
      console.log('Doctor Address:', doctorAddress);
  
      const doctorDetails = await record.methods.searchDoctor(doctorAddress).call();
      console.log('Doctor Details:', doctorDetails);
      this.setState({
        aadhaar: doctorDetails[0],
        name: doctorDetails[1],
        phone: doctorDetails[2],
        gender: doctorDetails[3],
        dob: doctorDetails[4],
        qualification: doctorDetails[5],
        major: doctorDetails[6],
      });
    } catch (err) {
      console.log(err);
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const { aadhaar, name, phone, gender, dob, qualification, major } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();

      await record.methods
        .editDoctor(aadhaar, name, phone, gender, dob, qualification, major)
        .send({ from: accounts[0] });

      alert('Doctor account updated successfully!');
    } catch (err) {
      this.setState({ errorMessage: err.message });
      alert('Failed to update doctor account');
    }

    this.setState({
      loading: false,
      aadhaar: '',
      name: '',
      phone: '',
      gender: '',
      dob: '',
      qualification: '',
      major: '',
    });
  };

  render() {
    return (
      <Layout>
        <Segment padded>
          <h1>Edit Profile</h1>
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
            <br />
            <Form.Group widths='equal'>
              <Form.Field
                label='Gender'
                control={Select}
                options={genderOptions}
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
            </Form.Group>
            <br />
            <h2 style={{ marginTop: '20px', marginBottom: '30px' }}>Education Information</h2>
            <Divider clearing />
            <Form.Group widths='equal'>
              <Form.Field
                label='Highest Qualification'
                control={Select}
                options={qualificationOptions}
                value={this.state.qualification}
                onChange={this.handleQualification}
              />

              <Form.Field>
                <label>Major</label>
                <Input
                  placeholder='Eg. Biology'
                  value={this.state.major}
                  onChange={(event) => this.setState({ major: event.target.value })}
                />
              </Form.Field>
            </Form.Group>
            <br />
            <Message error header='Oops!' content={this.state.errorMessage} />
            <Button primary loading={this.state.loading}>
              Update
            </Button>
          </Form>
        </Segment>
      </Layout>
    );
  }
}

export default EditDoctor;
