'use client';

import { useState } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [storeData, setStoreData] = useState({});

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return <Step1 nextStep={nextStep} storeData={storeData} setStoreData={setStoreData} />;
    case 2:
      return <Step2 nextStep={nextStep} prevStep={prevStep} storeData={storeData} setStoreData={setStoreData} />;
    case 3:
      return <Step3 prevStep={prevStep} storeData={storeData} setStoreData={setStoreData} />;
    default:
      return <div>Terima kasih telah mendaftar!</div>;
  }
}
