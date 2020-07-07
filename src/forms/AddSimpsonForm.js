import React from 'react';
import { Formik } from 'formik';
import { Input, 
         //Button, 
         Tag } from 'antd';
import { addNewSimpsonCharacter } from '../client';

const inputBottomMargin = {marginBottom: '10px'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputBottomMargin};

const AddSimpsonForm = (props) => (
    <Formik
        initialValues={{ name: '', surname: '', birthday: '', country: '', city: ''}}
        validate={values => {
            let errors = {};

            if (!values.name) {
                errors.name = 'Name Required'
            }

            if (!values.surname) {
                errors.surname = 'Surname Required'
            }

            if (!values.birthday) {
                errors.birthday = 'Birthday Required';
            } 

            if (!values.country) {
                errors.country = 'Country Required';
            } 

            if (!values.city) {
                errors.city = 'City Required';
            }
            
            return errors;
        }}
        onSubmit={(simpson, { setSubmitting }) => {
            addNewSimpsonCharacter(simpson).then(() => {
                props.onSuccess();
            })
            .catch(err => {
                props.onFailure(err);
            })
            .finally(() => {
                setSubmitting(false);
            })
        }}>
    {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        isValid
    }) => (
        <form onSubmit={handleSubmit}>
            <Input
                style={inputBottomMargin}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder='Name'
            />
            {errors.name && touched.name &&
                    <Tag style={tagStyle}>{errors.name}</Tag>}
            <Input
                style={inputBottomMargin}
                name="surname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.surname}
                placeholder='Surname'
            />
            {errors.surname && touched.surname && 
                <Tag style={tagStyle}>{errors.surname}</Tag>}
            <Input
                style={inputBottomMargin}
                name="birthday"
                type='date'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.birthday}
                placeholder='Birthday'
            />
            {errors.birthday && touched.birthday && 
                <Tag style={tagStyle}>{errors.birthday}</Tag>}
            <Input
                style={inputBottomMargin}
                name="country"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
                placeholder='Country'
            />
            {errors.country && touched.country && 
                <Tag style={tagStyle}>{errors.country}</Tag>}
            <Input
                style={inputBottomMargin}
                name="city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                placeholder='City'
            />
            {errors.city && touched.city && 
                <Tag style={tagStyle}>{errors.city}</Tag>}
            <button 
                onClick={() => submitForm()} 
                type="submit" 
                disabled={isSubmitting | (touched && !isValid)}>
                Submit
            </button>
        </form>
    )}
    </Formik>
);


export default AddSimpsonForm;