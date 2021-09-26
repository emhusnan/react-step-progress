import React from 'react';

import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';

import './index.css';
import './App.css';
import   icon1 from './svg/iwizard4.svg'

const step1Content = <h1>Step 1</h1>;
const step2Content = <h1>Step 2</h1>;
const step3Content = <h1>Step 3</h1>;
const step4Content = <h1>Step 4</h1>;

function step2Validator() {
  return true;
}

function step3Validator() {
  return true;
}

function App() {
  const onSubmit = () => {
    alert('submit data');
  };

  return (
    <div class="app">
      <StepProgressBar
        startingStep={0}
        wrapperClass="progress-wrapper-custom"
        onSubmit={onSubmit}
        submitBtnName="Υποβολή"
        previousBtnName="Πίσω"
        nextBtnName="Επόμενο"
        steps={[
          {
            label: 'Step 1',
            name: 'step 1',
            content: step1Content,
            imageIcon:icon1
          },
          {
            label: 'Step 2',
            name: 'step 2',
            content: step2Content,

            validator: step2Validator
          },
          {
            label: 'Step 3',
            name: 'step 3',
            content: step3Content,
            imageIcon:icon1,
            validator: step3Validator
          },
          {
            label: 'Step 4',
            name: 'step 4',
            imageIcon:icon1,
            content: step4Content
          }
        ]}
      />
    </div>
  );
}

export default App;
