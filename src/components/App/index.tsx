/** Libraries */
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

/** Interfaces */
interface FormValues {
  phone?: string,
  message?: string
}

/** Styles */
import './index.css';

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
  const { handleSubmit, valid } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="phone" placeholder="Mobile Number" type="tel" component={renderField} />
      <Field name="message" component={renderField} type="textarea" placeholder="Message" />

      {valid ? (
        <button type="submit" className="submit-button">Send</button>
      ) : (
          <button disabled className="disabled-button">Send</button>
        )}

    </form>
  )
})

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SMSForm onSubmit={values => console.log(values)} />
      </div>
    );
  }
}

export default App;
