import React, { useEffect, useState } from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../../backend/server/record';
import web3 from '../../backend/server/web3';
import { useRouter } from 'next/router';

const DoctorDetails = () => {
    const [doctorDetails, setDoctorDetails] = useState({
        ic: '',
        name: '',
        phone: '',
        gender: '',
        dob: '',
        qualification: '',
        major: '',
        profilePic: '',
    });

    const router = useRouter();
    const { address } = router.query;

    useEffect(() => {
        async function fetchDoctorDetails() {
            if (address) {
                const accounts = await web3.eth.getAccounts();
                try {
                    const doctor = await record.methods.searchDoctor(address).call({ from: accounts[0] });
                    const profilePic = doctor[3] === 'Male' ? 'https://cdn-icons-png.flaticon.com/128/387/387561.png' : 'https://cdn-icons-png.flaticon.com/128/387/387569.png';

                    setDoctorDetails({
                        ic: doctor[0],
                        name: doctor[1],
                        phone: doctor[2],
                        gender: doctor[3],
                        dob: doctor[4],
                        qualification: doctor[5],
                        major: doctor[6],
                        profilePic,
                    });
                } catch (err) {
                    alert('You have not created an account');
                    router.push('/list');
                }
            }
        }

        fetchDoctorDetails();
    }, [address]);

    const renderDisplayNew = () => {
        return (
            <Grid columns={2} stackable className="fill-content">
                <Grid.Row>
                    <Grid.Column width={1} />
                    <Grid.Column width={14}>
                        <Segment>
                            <Image style={{ marginBottom: '25px' }} className="centered" src={doctorDetails.profilePic} size="small" circular />
                            <Segment>
                                <h2 style={{ textAlign: 'center' }}>{doctorDetails.name}</h2>
                            </Segment>
                        </Segment>
                        <Segment>
                            <Header as="h3" color='grey' style={{ marginBottom: '25px' }}>PERSONAL DETAILS</Header>
                            <Grid columns={3} verticalAlign='top'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <b style={{ color: 'grey' }}>Full Name</b>
                                        <div>{doctorDetails.name}</div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <b style={{ color: 'grey' }}>IC</b>
                                        <div>{doctorDetails.ic}</div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <b style={{ color: 'grey' }}>Gender</b>
                                        <div>{doctorDetails.gender}</div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                            <Grid columns={2} verticalAlign='top'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <b style={{ color: 'grey' }}>Phone</b>
                                        <div>{doctorDetails.phone}</div>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <b style={{ color: 'grey' }}>Birthdate</b>
                                        <div>{doctorDetails.dob}</div>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                            <Header as="h3" color='grey' style={{marginTop:'35px', marginBottom:'25px'}}>EDUCATION DETAILS</Header>
                    <Grid columns={2} verticalAlign='top'>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Highest Qualification</b>
                                <div>{doctorDetails.qualification}</div>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Major</b>
                                <div>{doctorDetails.major}</div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>


                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={1} />
                </Grid.Row>
            </Grid>
        );
    };

    return (
        <Layout>
            <div>{renderDisplayNew()}</div>
        </Layout>
    );
};

export default DoctorDetails;
