import React, { Component } from 'react';
import { Divider, Form, Input, Button, Segment, Message, Select } from 'semantic-ui-react';
import { Link } from '../../../backend/routes';
import { Router } from '../../../backend/routes';
import web3 from '../../../backend/server/web3';
import Layout from '../../components/Layout';
import record from '../../../backend/build/Record.json'

const statusOptions = [
  { key: 'p', text: 'Pending', value: 'Pending' },
  { key: 'c', text: 'Complete', value: 'Complete' },
];

class EditAppointment extends Component {
  state = {
    patientaddr: '',
    date: '',
    time: '',
    prescription: '',
    description: '',
    diagnosis: '',
    status: '',
    errorMessage: '',
  };

  handleStatus = (e, { value }) => this.setState({ status: value });

  async componentDidMount() {
    try {
      const accounts = await web3.eth.getAccounts();
      const appointmentId = this.props.match.params.appointmentId; // Assuming you have the appointmentId as a URL parameter.

      const appointmentDetails = await record.methods.getAppointment(appointmentId).call();
      this.setState({
        patientaddr: appointmentDetails.patientaddr,
        date: appointmentDetails.date,
        time: appointmentDetails.time,
        prescription: appointmentDetails.prescription,
        description: appointmentDetails.description,
        diagnosis: appointmentDetails.diagnosis,
        status: appointmentDetails.status,
      });
    } catch (err) {
      console.log(err);
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const { patientaddr, date, time, diagnosis, prescription, description, status } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      const appointmentId = this.props.match.params.appointmentId; // Assuming you have the appointmentId as a URL parameter.

      await record.methods
        .updateAppointment(appointmentId, patientaddr, date, time, diagnosis, prescription, description, status)
        .send({ from: accounts[0] });

      alert('Appointment updated successfully!');
      Router.pushRoute('/list'); // Assuming you want to redirect to a list page after updating the appointment.
    } catch (err) {
      this.setState({ errorMessage: err.message });
      alert('Failed to update appointment');
    }

    this.setState({
      loading: false,
      patientaddr: '',
      date: '',
      time: '',
      prescription: '',
      description: '',
      diagnosis: '',
      status: '',
    });
  };

  render() {
    return (
      <Layout>
        <Segment padded>
          <h1>Update Appointment</h1>
        </Segment>
        <Segment>
          <h2 style={{ marginTop: '20px', marginBottom: '30px' }}>Appointment Information</h2>
          <Divider clearing />
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Patient's Ethereum Address</label>
                <Input
                  placeholder='Eg. 0xF6973b46412ff52c1BfDB783D29e5218620Be542'
                  value={this.state.patientaddr}
                  onChange={(event) => this.setState({ patientaddr: event.target.value })}
                />
              </Form.Field>
            </Form.Group>

            <br />
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Date</label>
                <Input
                  placeholder='Eg. 10/10/2023'
                  value={this.state.date}
                  onChange={(event) => this.setState({ date: event.target.value })}
                />
              </Form.Field>

              <Form.Field>
                <label>Time</label>
                <Input
                  placeholder='Eg. 10:30am'
                  value={this.state.time}
                  onChange={(event) => this.setState({ time: event.target.value })}
                />
              </Form.Field>

              <Form.Field
                label='Status'
                control={Select}
                options={statusOptions}
                value={this.state.status}
                onChange={this.handleStatus}
              />
            </Form.Group>

            <br />
            <h2 style={{ marginTop: '20px', marginBottom: '30px' }}>Medical Information</h2>
            <Divider clearing />
            <Form.TextArea
              label='Prescription'
              placeholder='Eg. Amoxicillin 500mg'
              value={this.state.prescription}
              onChange={(event) => this.setState({ prescription: event.target.value })}
            />

            <br />
            <Form.TextArea
              label='Diagnosis'
              placeholder='Eg. Skin Infection'
              value={this.state.diagnosis}
              onChange={(event) => this.setState({ diagnosis: event.target.value })}
            />
            <br />
            <Form.TextArea
              label='Notes'
              placeholder='Eg. Still requires further observation'
              value={this.state.description}
              onChange={(event) => this.setState({ description: event.target.value })}
            />

            <br />
            <Message error header='Oops!' content={this.state.errorMessage} />
            <Button primary loading={this.state.loading}>
              Create
            </Button>
          </Form>
        </Segment>
      </Layout>
    );
  }
}

export default EditAppointment;
