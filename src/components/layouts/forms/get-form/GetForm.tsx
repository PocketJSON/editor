import React, { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Tools from '../../../../tools/Tools';

import classes from './GetForm.module.scss';

import CustomButton from '../../../UI/Buttons/CustomButton';
import LinkButton from '../../../UI/Buttons/LinkButton';
import FormWithToFields from '../../../FormWithToFields';
import SwitchDiv from '../../../SwitchDiv';
import ParamsList from '../../../ParamsList';

function GetForm(): JSX.Element {
  const [parameters, setParameters] = useState<any>({});
  const [displayedParameters, setDisplayedParameters] = useState<any[]>([])
  const [needParameters, setNeedParameters] = useState<boolean>(false);
  const [needRedirect, setNeedRedirect] = useState<boolean>(false);

  const displayedParameterNameRef = useRef<HTMLInputElement>(null);
  const displayedParameterValueRef = useRef<HTMLInputElement>(null);

  const parametersDivClasses: string[] = [classes.ParametersWrapper];
  if(needParameters){
    parametersDivClasses.push(classes.active);
  }
  function handleIsCheckedParameters(): void {    
    setNeedParameters(!needParameters);        
  }
  function handleSubmitParams(values: any): void {
    parameters[values.name] = values.value;

    const changedParamsObject = Object.entries(parameters).map(entry => ({[entry[0]]: entry[1]}));

    function convertToArrays() {
      let updatedArray = changedParamsObject.map((e: any) => {
        const objectKeys: string[] = Object.keys(e);
        const objectValues: (string | number)[] = Object.values(e);
        
        const result =  [...objectKeys, ...objectValues];
        return result;
      })
      return updatedArray;
    }
    
    const parametersMatrix = convertToArrays();     
    setDisplayedParameters(parametersMatrix)
  }
  function handleSubmitFetch(values: any) {
    if(values.name && values.url){
      localStorage.getItem('GET_CFG')
        ? localStorage.removeItem('GET_CFG')
        : console.log('config is empty')
        
      const date: string = Tools.getCurrentDate();
      
      Tools.setDataToStorage(needParameters, values.name, date, values.url, parameters);
      setNeedRedirect(true);
    } else {
      console.error('не все поля заполнены');
    }
  }

  return (
    <div className={classes.SettingsWrapper}>
      <FormWithToFields
          firstInitValueName={'url'}
          secondInitValueName={'name'}
          firstInitValue={'https://jsonplaceholder.typicode.com/posts'}
          secondInitValue={'asd'}
          firstInfoText={'Fetch url:'}
          secondInfoText={'File name:'}
          onSubmitFuncton={handleSubmitFetch}
          formId={'main-request-data'}/>
      <SwitchDiv
        needParameters={needParameters}
        handleIsCheckedParameters={handleIsCheckedParameters}
        spanText={'Need parameters?'}/>
      <div className={parametersDivClasses.join(' ')}>
        <FormWithToFields
          firstInitValueName={'name'}
          secondInitValueName={'value'}
          firstInitValue={'_limit'}
          secondInitValue={1}
          firstInfoText={'Parameter name:'}
          secondInfoText={'Parameter value:'}
          firstRef={displayedParameterNameRef}
          secondRef={displayedParameterValueRef}
          onSubmitFuncton={handleSubmitParams}
          formId={'parameters-data'}/>
        <CustomButton
          children={'Submit params'}
          type={'submit'}
          form={'parameters-data'}/>
        <ParamsList 
          disParameters={displayedParameters}
          setParameters={setDisplayedParameters}
          a={setParameters}
          parameters={parameters}/>
      </div>
      <CustomButton
        children={'Submit'}
        type={'submit'}
        form={'main-request-data'}/>
      <LinkButton
        content={'Go home'}
        path={"/welcome"}/>
      {needRedirect 
        ? <Navigate 
            to="/workspace"/> 
        : <></>}
    </div>
  )
}

export default GetForm;