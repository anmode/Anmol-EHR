pragma solidity ^0.4.17;

contract Record {
    enum UserRole { Anmol, Patient, Doctor, Hospital, Clinic }

    struct Patients{
        string aadhaar;
        string name;
        string phone;
        string gender;
        string dob;
        string height;
        string weight;
        string houseaddr;
        string bloodgroup;
        string allergies;
        string medication;
        string emergencyName;
        string emergencyContact;
        address addr;
        uint date;
    }

    struct Doctors{
        string aadhaar;
        string name;
        string phone;
        string gender;
        string dob;
        string qualification;
        string major;
        address addr;
        uint date;
    }

    struct Appointments{
        address doctoraddr;
        address patientaddr;
        string date;
        string time;
        string prescription;
        string description;
        string diagnosis;
        string status;
        uint creationDate;
    }

     struct Hospitals {
        string reg_no;
        string name;
        string location;
        string contact;
        address addr;
        uint date;
    }

    struct Clinics {
        string reg_no;
        string name;
        string location;
        string contact;
        address addr;
        uint date;
    }

    // Mapping to store the roles assigned to each user
    mapping(address => UserRole) public userRoles;

    address public owner;
    address[] public patientList;
    address[] public doctorList;
    address[] public appointmentList;
    address[] public hospitalsList;
    address[] public clinicsList;

    mapping(address => Patients) patients;
    mapping(address => Doctors) doctors;
    mapping(address => Appointments) appointments;
    mapping(address => Hospitals) hospitals;
    mapping(address => Clinics) clinics;


    mapping(address=>mapping(address=>bool)) isApproved;
    mapping(address => bool) isPatient;
    mapping(address => bool) isDoctor;
    mapping(address => uint) AppointmentPerPatient;
    mapping(address => bool) isHospital;
    mapping(address => bool) isClinic;

    uint256 public patientCount = 0;
    uint256 public doctorCount = 0;
    uint256 public appointmentCount = 0;
    uint256 public permissionGrantedCount = 0;
    uint256 public hospitalCount = 0;
    uint256 public clinicCount = 0;
    
    function Record() public {
        owner = msg.sender;
    }
    
    //Retrieve patient details from user sign up page and store the details into the blockchain
    function setDetails(string _aadhaar, string _name, string _phone, string _gender, string _dob, string _height, string _weight, string _houseaddr, string _bloodgroup, string _allergies, string _medication, string _emergencyName, string _emergencyContact) public {
        require(!isPatient[msg.sender]);
        var p = patients[msg.sender];
        
        p.aadhaar = _aadhaar;
        p.name = _name;
        p.phone = _phone;
        p.gender = _gender;
        p.dob = _dob;
        p.height = _height; 
        p.weight = _weight;
        p.houseaddr = _houseaddr;
        p.bloodgroup = _bloodgroup;
        p.allergies = _allergies;
        p.medication = _medication;
        p.emergencyName = _emergencyName;
        p.emergencyContact = _emergencyContact;
        p.addr = msg.sender;
        p.date = block.timestamp;
        
        userRoles[msg.sender] = UserRole.Patient;
        patientList.push(msg.sender);
        isPatient[msg.sender] = true;
        isApproved[msg.sender][msg.sender] = true;
        patientCount++;
    }
    
    //Allows patient to edit their existing record
    function editDetails(string _aadhaar, string _name, string _phone, string _gender, string _dob, string _height, string _weight, string _houseaddr, string _bloodgroup, string _allergies, string _medication, string _emergencyName, string _emergencyContact) public {
        require(isPatient[msg.sender]);
        var p = patients[msg.sender];
        
        p.aadhaar = _aadhaar;
        p.name = _name;
        p.phone = _phone;
        p.gender = _gender;
        p.dob = _dob;
        p.height = _height; 
        p.weight = _weight;
        p.houseaddr = _houseaddr;
        p.bloodgroup = _bloodgroup;
        p.allergies = _allergies;
        p.medication = _medication;
        p.emergencyName = _emergencyName;
        p.emergencyContact = _emergencyContact;
        p.addr = msg.sender;    
    }

    //Retrieve patient details from doctor registration page and store the details into the blockchain
    function setDoctor(string _aadhaar, string _name, string _phone, string _gender, string _dob, string _qualification, string _major) public {
        require(!isDoctor[msg.sender]);
        var d = doctors[msg.sender];
        
        d.aadhaar = _aadhaar;
        d.name = _name;
        d.phone = _phone;
        d.gender = _gender;
        d.dob = _dob;
        d.qualification = _qualification;
        d.major = _major;
        d.addr = msg.sender;
        d.date = block.timestamp;

        userRoles[msg.sender] = UserRole.Doctor;
        doctorList.push(msg.sender);
        isDoctor[msg.sender] = true;
        doctorCount++;
    }

    //Allows doctors to edit their existing profile
    function editDoctor(string _aadhaar, string _name, string _phone, string _gender, string _dob, string _qualification, string _major) public {
        require(isDoctor[msg.sender]);
        var d = doctors[msg.sender];
        
        d.aadhaar = _aadhaar;
        d.name = _name;
        d.phone = _phone;
        d.gender = _gender;
        d.dob = _dob;
        d.qualification = _qualification;
        d.major = _major;
        d.addr = msg.sender;
    }

    //Retrieve appointment details from appointment page and store the details into the blockchain
    function setAppointment(address _addr, string _date, string _time, string _diagnosis, string _prescription, string _description, string _status) public {
        require(isDoctor[msg.sender]);
        var a = appointments[_addr];
        
        a.doctoraddr = msg.sender;
        a.patientaddr = _addr;
        a.date = _date;
        a.time = _time;
        a.diagnosis = _diagnosis;
        a.prescription = _prescription; 
        a.description = _description;
        a.status = _status;
        a.creationDate = block.timestamp;

        appointmentList.push(_addr);
        appointmentCount++;
        AppointmentPerPatient[_addr]++;
    }
    
    //Retrieve appointment details from appointment page and store the details into the blockchain
    function updateAppointment(address _addr, string _date, string _time, string _diagnosis, string _prescription, string _description, string _status) public {
        require(isDoctor[msg.sender]);
        var a = appointments[_addr];
        
        a.doctoraddr = msg.sender;
        a.patientaddr = _addr;
        a.date = _date;
        a.time = _time;
        a.diagnosis = _diagnosis;
        a.prescription = _prescription; 
        a.description = _description;
        a.status = _status;
    }

     function setHospital(string _reg_no,string _name,string _location,string _contact) public {
        require(!isHospital[msg.sender]);
        var h = hospitals[msg.sender];

        h.reg_no = _reg_no;
        h.name = _name;
        h.location = _location;
        h.contact = _contact;
        h.addr = msg.sender;
        h.date = block.timestamp;

        userRoles[msg.sender] = UserRole.Hospital;
        hospitalsList.push(msg.sender);
        isHospital[msg.sender] = true;
        hospitalCount++;
    }

    function setClinic( string _reg_no,string _name,string _location,string _contact) public {
        require(!isClinic[msg.sender]);
        var c = clinics[msg.sender];

        c.reg_no = _reg_no;
        c.name = _name;
        c.location = _location;
        c.contact = _contact;
        c.addr = msg.sender;
        c.date = block.timestamp;

        userRoles[msg.sender] = UserRole.Clinic;
        clinicsList.push(msg.sender);
        isClinic[msg.sender] = true;
        clinicCount++;
    }
    
    //Owner of the record must give permission to doctor only they are allowed to view records
    function givePermission(address _address) public returns(bool success) {
        isApproved[msg.sender][_address] = true;
        permissionGrantedCount++;
        return true;
    }

    //Owner of the record can take away the permission granted to doctors to view records
    function RevokePermission(address _address) public returns(bool success) {
        isApproved[msg.sender][_address] = false;
        return true;
    }

    //Retrieve a list of all patients address
    function getPatients() public view returns(address[]) {
        return patientList;
    }

    //Retrieve a list of all doctors address
    function getDoctors() public view returns(address[]) {
        return doctorList;
    }

     //Retrieve a list of all doctors address
    function getClinics() public view returns(address[]) {
        return clinicsList;
    }

     //Retrieve a list of all doctors address
    function getHospitals() public view returns(address[]) {
        return hospitalsList;
    }

    //Retrieve a list of all appointments address
    function getAppointments() public view returns(address[]) {
        return appointmentList;
    }
    
    //Search patient details by entering a patient address (Only record owner or doctor with permission will be allowed to access)
    function searchPatientDemographic(address _address) public view returns(string, string, string, string, string, string, string) {
        require(isApproved[_address][msg.sender]);
        
        var p = patients[_address];
        
        return (p.aadhaar, p.name, p.phone, p.gender, p.dob, p.height, p.weight);
    }

    //Search patient details by entering a patient address (Only record owner or doctor with permission will be allowed to access)
    function searchPatientMedical(address _address) public view returns(string, string, string, string, string, string) {
        require(isApproved[_address][msg.sender]);
        
        var p = patients[_address];
        
        return (p.houseaddr, p.bloodgroup, p.allergies, p.medication, p.emergencyName, p.emergencyContact);
    }

    //Search doctor details by entering a doctor address (Only doctor will be allowed to access)
    function searchDoctor(address _address) public view returns(string, string, string, string, string, string, string) {
        require(isDoctor[_address]);
        
        var d = doctors[_address];
        
        return (d.aadhaar, d.name, d.phone, d.gender, d.dob, d.qualification, d.major);
    }
    
    //Search appointment details by entering a patient address
    function searchAppointment(address _address) public view returns(address, string, string, string, string, string, string, string) {
        var a = appointments[_address];
        var d = doctors[a.doctoraddr];

        return (a.doctoraddr, d.name, a.date, a.time, a.diagnosis, a.prescription, a.description, a.status);
    }

    //Search patient record creation date by entering a patient address
    function searchRecordDate(address _address) public view returns(uint) {
        var p = patients[_address];
        
        return (p.date);
    }

    //Search doctor profile creation date by entering a patient address
    function searchDoctorDate(address _address) public view returns(uint) {
        var d = doctors[_address];
        
        return (d.date);
    }

    //Search appointment creation date by entering a patient address
    function searchAppointmentDate(address _address) public view returns(uint) {
        var a = appointments[_address];
        
        return (a.creationDate);
    }

    //Retrieve patient count
    function getPatientCount() public view returns(uint256) {
        return patientCount;
    }

    //Retrieve doctor count
    function getDoctorCount() public view returns(uint256) {
        return doctorCount;
    }

    //Retrieve doctor count
    function getClinicCount() public view returns(uint256) {
        return doctorCount;
    }

    //Retrieve doctor count
    function getHospitalCount() public view returns(uint256) {
        return doctorCount;
    }

    //Retrieve appointment count
    function getAppointmentCount() public view returns(uint256) {
        return appointmentCount;
    }

    //Retrieve permission granted count
    function getPermissionGrantedCount() public view returns(uint256) {
        return permissionGrantedCount;
    }

    //Retrieve permission granted count
    function getAppointmentPerPatient(address _address) public view returns(uint256) {
        return AppointmentPerPatient[_address];
    }

     // Function to get the role of a user
    function getUserRole(address _address) public view returns (UserRole) {
        return userRoles[_address];
    }
}