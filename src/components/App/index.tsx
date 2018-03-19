/** Libraries */
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

/** Styles */
import './index.css';

/** Form Component */
const SMSForm = reduxForm({
  form: 'sms'
})(props => {

  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="phone" component="input" required placeholder="Mobile Number" />
      <Field name="message" component="textarea" required validate={value => value.length <= 459} placeholder="Message" />
    </form>
  )
})

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SMSForm onSubmit={() => { }} />
      </div>
    );
  }
}

export default App;
