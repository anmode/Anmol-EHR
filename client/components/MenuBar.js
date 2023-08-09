import React, { Component } from 'react';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import record from  '../../backend/build/Record.json';
import web3 from '../../backend/server/web3';
import { Link } from '../../backend/routes';
import { Router } from '../../backend/routes';

//Header that is used in all pages

export default class MenuBar extends Component {

  onClickedPatient = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/record/${accounts[0]}`);
  }

  onClickedDoctor = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    Router.pushRoute(`/doctor/${accounts[0]}`);
  }

  render() {
    return (
      <Menu size='large' inverted>
          <Link route='/'>
              <a className='item'>Home</a>
          </Link>

          <Menu.Menu position='right'>
            <Link route='/dashboard'>
                <a className='item'>Dashboard</a>
            </Link>

            <Link route='/list'>
                <a className='item'>Records List</a>
            </Link>

            <Dropdown item text='Doctor'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route='/'>
                    <a style={{color:'black'}} onClick={this.onClickedDoctor}>View Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/edit/edit-doctor'>
                    <a style={{color:'black'}}>Edit Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/make-appointment'>
                    <a style={{color:'black'}}>Make Appointment</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/edit-appointment'>
                    <a style={{color:'black'}}>Update Appointment</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            <Dropdown item text='Patient'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route='/'>
                    <a style={{color:'black'}} onClick={this.onClickedPatient}>View Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/edit/edit-patient'>
                    <a style={{color:'black'}}>Edit Profile</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/approve-doctor'>
                    <a style={{color:'black'}}>Allow Access</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/revoke-doctor'>
                    <a style={{color:'black'}}>Revoke Access</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown item text='Register'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link route='/register/register-patient'>
                    <a style={{color:'black'}}>Patient</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/register/register-doctor'>
                    <a style={{color:'black'}}>Doctor</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/register/register-hospital'>
                    <a style={{color:'black'}}>Hospital</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link route='/register/register-hospital'>
                    <a style={{color:'black'}}>Clinic</a>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Menu.Menu>
      </Menu>  
    );
  }
}