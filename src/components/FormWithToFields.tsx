import { Formik, Field, Form } from "formik";
import Input from './UI/Input/Input';

import { FormWithToFieldsProps } from '../types/elements';
import { DynamicObjectKeys } from "../types/simple_models";

function FormWithToFields({
    firstInitValueName, 
    firstInitValue,
    firstInfoText, 
    firstRef, 
    secondInitValueName, 
    secondInitValue,
    secondInfoText,
    secondRef,
    onSubmitFuncton, 
    formId
  }: FormWithToFieldsProps) {
  const initValues: DynamicObjectKeys = {};
    initValues[firstInitValueName] = firstInitValue;
    initValues[secondInitValueName] = secondInitValue;

  return (
    <Formik
        initialValues={initValues}
        onSubmit={(values: object) => {
          onSubmitFuncton(values);
      }}>
      <Form id={formId}>
        <label>
          <span>{firstInfoText}</span>
          <Field name={firstInitValueName} type="text" innerRef={firstRef} as={Input} placeholder={firstInfoText}/>
        </label>
        <label>
          <span>{secondInfoText}</span>
          <Field name={secondInitValueName} type="text" innerRef={secondRef} as={Input} placeholder={secondInfoText}/>
        </label>
      </Form>
    </Formik>
  )
}

export default FormWithToFields;