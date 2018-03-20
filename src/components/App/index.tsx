/** Libraries */
import * as React from 'react';
import { Field, reduxForm, startSubmit, stopSubmit, reset } from 'redux-form';
import { ClipLoader } from 'react-spinners'

/** Actions */
import { shortenURLs, sendSMS } from '../../actions';

/** Assets */
import logo from '../../assets/logo.png';

/** Interfaces */
interface FormValues {
  phone: string,
  message: string
}

interface AppDispatchProps {
  startSubmission: () => void,
  stopSubmission: () => void
}

/** Styles */
import './index.css';
import { Dispatch, connect } from 'react-redux';

/** Form */
const renderField = (field: any) => {
  const { input, meta: { error }, placeholder, type } = field;
  const { value } = input;

  if (field.type === "textarea") {
    return (
      <div className={`input-area multi ${error ? 'error' : ''}`}>
        <textarea {...input} placeholder={placeholder} required />
        {value ? (
          <p className="count">{459 - value.length}</p>
        ) : (
            <p className="count">459</p>
          )}
      </div>
    )
  }

  return (
    <div className={`input-area single ${error ? 'error' : ''}`}>
      <input {...input} type={type} placeholder={placeholder} required />
      {error && <p className="count">{error}</p>}
    </div>
  )
}

const SMSForm = reduxForm<FormValues>({
  form: 'sms',
  validate: values => {
    const phoneNo = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

    const errors = {
      message: values.message && values.message.length > 459 ? "To many characters" : undefined,
      phone: values.phone && !values.phone.match(phoneNo) ? "Invalid Number" : undefined
    }

    return errors;
  }
})(props => {
  const { handleSubmit, valid, submitting } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="phone" placeholder="Mobile Number" type="tel" component={renderField} />
      <Field name="message" component={renderField} type="textarea" placeholder="Message" />

      {valid ? (
        <button type="submit" className="submit-button">
          <ClipLoader loading={submitting} color="#fff" size={16} />
          {submitting ? 'Sending ...' : 'Send'}
        </button>
      ) : (
          <button disabled className="disabled-button">Send</button>
        )}

    </form>
  )
})

class App extends React.Component<AppDispatchProps> {
  submitForm = (values: FormValues) => {
    const { startSubmission, stopSubmission } = this.props

    // Start subsmission
    startSubmission();

    // Replace links in the original message
    shortenURLs(values.message, message => sendSMS(values.phone as string, message, stopSubmission));
  }

  render() {
    return (
      <div className="App">
        <img src={logo} width="250" style={{ marginBottom: '20px' }} />
        <SMSForm onSubmit={this.submitForm} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): AppDispatchProps => {
  return {
    startSubmission: () => dispatch(startSubmit('sms')),
    stopSubmission: () => {
      dispatch(stopSubmit('sms'))
      dispatch(reset('sms'))
    }
  }
}

export default connect<{}, AppDispatchProps, {}>(null, mapDispatchToProps)(App);
