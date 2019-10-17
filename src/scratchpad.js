const txtFieldState = {
  value: '',
  valid: true,
  typeMismatch: false,
  errMsg: '', //this is where our error message gets across
};
class App extends Component {
  state = {
    email: {
      ...txtFieldState,
      fieldName: 'Email',
      required: true,
      requiredTxt: 'Email is required',
      formatErrorTxt: 'Incorrect email format',
    },
    firstname: {
      ...txtFieldState,
      fieldName: 'First Name',
      required: true,
      requiredTxt: 'First Name is required',
    },
    lastname: {
      ...txtFieldState,
      fieldName: 'Last Name',
      required: false,
      requiredTxt: 'Last Name is required',
    },
    allFieldsValid: false,
  };
}
