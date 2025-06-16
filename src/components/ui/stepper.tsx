import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react'
import {addProductRequest} from '../../store/Inventory/product/actions'

const Stepper = ({ steps, handleOnClick }) => {
    const [activeStep, setActiveStep] = useState(0);
    const stageCompleted = useSelector((state: any) => state.Product?.stageCompleted || false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (stageCompleted && activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
            // Optionally reset the flag
            dispatch({ type: 'RESET_STAGE_COMPLETED' });
        }
    }, [stageCompleted]);

    const handleNext = () => {
        dispatch(handleOnClick());
        if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (activeStep > 0) setActiveStep((prev) => prev - 1);
    };

    return (
        <div className="mx-auto p-6">
            {/* Step indicators with horizontal lines */}
            <div className="relative flex justify-between items-center mb-10">
                {steps.map((step, index) => (
                    <div className="flex-1 flex flex-col items-center relative" key={index}>
                        {/* Circle */}
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white z-10
              ${index <= activeStep ? "bg-brand-blue" : "bg-gray-300"}`}
                        >
                            {index + 1}
                        </div>
                        {/* Label */}
                        <span className="text-sm mt-2 text-center">{step.label}</span>

                        {/* Line to next step */}
                        {index < steps.length - 1 && (
                            <div
                                className={`absolute top-4 left-1/2 right-[-50%] h-1 
                ${index < activeStep ? "bg-brand-blue" : "bg-gray-300"}`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="text-center mb-6 text-lg font-medium">
                {steps[activeStep].content}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
                <button
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                    Back
                </button>
                {activeStep === steps.length - 1 ? (
                    <button
                        onClick={() => alert("Stepper Finished!")}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                        Finish
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-brand-blue text-white rounded"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default Stepper;

