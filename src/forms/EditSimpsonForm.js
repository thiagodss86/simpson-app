import React,  {Component} from 'react';
import { Formik } from 'formik';
import { Input, 
         Tag, 
        // Button 
        } from 'antd';

export default class EditUserForm extends Component {   
    render () {
        const { submitter, initialValues } = this.props;
        return (
          <Formik
          initialValues={initialValues}
          validate={values => {
            let errors = {};
            if (!values.name) {
              errors.name = 'Name required';
            }
            if (!values.surname) {
              errors.surname = 'Surname required';
            }
            if (!values.birthday) {
                errors.birthday = 'Birthday Required';
            } //else if (!/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/i.test(values.birthday)) {
              //  errors.birthday = 'Invalid birthday format';
            //}
            if (!values.country) {
                errors.country = 'Country Required';
            } 

            if (!values.city) {
                errors.city = 'City Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values)
            submitter(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            isValid,
            handleBlur,
            handleSubmit,
            isSubmitting,
            submitForm
          }) => (
            <form onSubmit={handleSubmit}>
              <Input
                style={{marginBottom: '5px'}}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.name}</Tag>}

              <Input
                style={{marginBottom: '5px'}}
                name="surname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.surname}
              />
              {errors.surname && touched.surname && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.surname}</Tag>}

              <Input
                style={{marginBottom: '5px'}}
                type="date"
                name="birthday"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.birthday}
              />
              {errors.birthday && touched.birthday && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.birthday}</Tag>}

              <Input
                style={{marginBottom: '5px'}}
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
              />
              {errors.country && touched.country && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.country}</Tag>}

              <Input
                style={{marginBottom: '5px'}}
                name="city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
              />
              {errors.city && touched.city && <Tag style={{marginBottom: '5px'}} color="#f50">{errors.city}</Tag>}

              <button onClick = {() => submitForm()} type="submit" disabled={isSubmitting | (touched && !isValid) }>
                Submit
              </button>
            </form>
          )}
        </Formik>
      )
    }
}