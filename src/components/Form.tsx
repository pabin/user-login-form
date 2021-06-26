import React, { useState } from 'react';
import {
  FORM_HEADING,
  ALREADY_HAVE_ACCOUNT_MSG,
  SIGIN_IN, AGGREEMENT_TEXT,
  YOUR_NAME,
  EMAIL_ADDRESS,
  PASSWORD_LABEL,
  EMAIL,
  PASSWORD,
  TEXT,
  BUTTON_LABEL,
  TERMS_TEXT,
  PRIVACY_TEXT,
} from '../constants/form';

import FormInput from './FormInput';
import Button from './Button';
import styles from './styles/form.module.css';
import { isEmail } from '../utils/emailValidator';
import FormSelect from './FormSelect';

const Form  = () => {
  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [role, setRole]= useState('');
  const [currentStep, setCurrentStep]= useState(1);

  const [validationError, setValidationError] = useState(false);
  const [passwordValidationErr, setPasswordValidationErr] = useState(false);

  const validateEmail = (emailValue: string) => {
    setEmail(emailValue)
    if (!emailValue) {
      setValidationError(false);
      return;
    };

    if (isEmail(emailValue)) {
      setValidationError(false);
    } else {
      setValidationError(true);
    }
  }

  const validatePassword = (passwordValue: string) => {
    setPassword(passwordValue);
    if (!passwordValue) {
      setPasswordValidationErr(false);
      return;
    };

    if (passwordValue.length >= 8) {
      setPasswordValidationErr(false);
    } else {
      setPasswordValidationErr(true);
    }
  }

  const onSubmit = () => {
    setCurrentStep(2);
    console.log('on form submit');
  }

  const isValidData = () => {
    if (name && isEmail(email) && password.length >= 8 && role) {
      return true;
    }
    return false;
  }

  // console.log('name', name);
  // console.log('password', password);
  // console.log('email', email);
  // console.log('role', role);


  return (
    <div className={styles.container}>
      <span data-testid="currentStep" className={styles.stepCount}>Step { currentStep } of 3 . . .</span>
      <div className={styles.formContainer}>
        <p className={styles.title}>{ FORM_HEADING }</p>
        <p>{ ALREADY_HAVE_ACCOUNT_MSG } <a href="#login">{SIGIN_IN}</a></p>
        <div className={styles.form}>
          <FormInput type={TEXT} name={YOUR_NAME} value={name} setValue={setName} />
          <FormInput type={EMAIL} name={EMAIL_ADDRESS} value={email} setValue={validateEmail} validationError={validationError} />
          <FormSelect setValue={setRole} />
          <FormInput type={PASSWORD} name={PASSWORD_LABEL} value={password} setValue={validatePassword} validationError={passwordValidationErr}/>
          <Button title={BUTTON_LABEL} onClick={onSubmit} disabled={isValidData() ? false : true}/>
        </div>
        <p className={styles.footerText}>{ AGGREEMENT_TEXT } <a href="#terms-od-service">{TERMS_TEXT}</a> and <a href="#privacy-policy">{PRIVACY_TEXT}</a></p>
      </div>
    </div>
  )
}

export default Form;