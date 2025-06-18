import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react'
import {addProductRequest} from '../../store/Inventory/product/actions'

const Stepper = ({ steps, handleNext, handleBack, activeStep, setActiveStep ,navigationSection = null }) => {
    // const [activeStep, setActiveStep] = useState(0);
    const stageCompleted = useSelector((state: any) => state.Product?.stageCompleted || false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (stageCompleted && activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
            // Optionally reset the flag
            dispatch({ type: 'RESET_STAGE_COMPLETED' });
        }
    }, [stageCompleted]);

    return (
        <div className="mx-auto p-6">
            {/* Step indicators with horizontal lines */}
            <div className="relative flex justify-between items-center mb-10">
                {steps.map((step, index) => {
                     const isActive = index === activeStep;
                const isCompleted = index < activeStep;
                // Line is active if it connects to a completed step OR the current active step
                const isLineActive = index < activeStep + 1; // Corrected logic based on screenshot
                    return (<div className="flex-1 flex flex-col items-center relative" key={index}>
                        {/* Circle */}
                        <div
                                className={`relative w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                                    ${isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'}
                                `}
                            >
                                {isCompleted ? (
                                    // Checkmark SVG for completed steps
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                ) : (
                                    // Render the Lucide icon for active/inactive steps
                                    <step.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-800'}`} />
                                )}
                            </div>
                        {/* Label */}
                         <div
                                className={`mt-2 text-center text-xs whitespace-nowrap transition-colors duration-300
                                    ${isActive ? 'text-blue-600 font-semibold' : isCompleted ? 'text-green-600' : 'text-gray-600'}
                                `}
                            >
                                {step.label}
                            </div>

                        {/* Line to next step */}
                        {index < steps.length - 1 && (
                            <div
                                className={`absolute top-4 left-[63%] right-[-37%] h-1 
                                ${index < activeStep ? "bg-brand-blue" : "bg-gray-300"}`}
                            />
                        )}
                    </div>)
                })}
            </div>

            {/* Step Content */}
            <div className="mb-6 text-lg font-medium">
                {steps[activeStep].content}
            </div>

            {/* Optional Navigation Section */}
            {navigationSection != null ? (
                navigationSection
            ) : (
            <div className="flex justify-between pt-6 border-t mt-6">
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
            )}
        </div>
    );
};

export default Stepper;

