import React, { useState } from "react";

const Stepper = ({ steps }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (activeStep > 0) setActiveStep((prev) => prev - 1);
    };

    return (
        <div className="flex flex-col w-full min-h-[80vh]">
            {/* Step indicators with horizontal lines */}
            <div className="relative flex justify-between items-center px-8 pt-8 pb-2 bg-white rounded-t-2xl shadow-sm">
                {steps.map((step, index) => (
                    <div className="flex-1 flex flex-col items-center relative min-w-[100px]" key={index}>
                        {/* Circle */}
                        <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-base font-semibold z-10 shadow-md
              ${index === activeStep ? "bg-brand-blue" : index < activeStep ? "bg-green-500" : "bg-gray-300"}`}
                        >
                            {index + 1}
                        </div>
                        {/* Label */}
                        <span className={`text-xs mt-2 text-center font-medium ${index === activeStep ? "text-brand-blue" : "text-gray-500"}`}>{step.label}</span>
                        {/* Line to next step */}
                        {index < steps.length - 1 && (
                            <div
                                className={`absolute top-4 left-1/2 right-[-50%] h-1 z-0
                ${index < activeStep ? "bg-green-500" : "bg-gray-300"}`}
                                style={{ width: '100%' }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content with fixed height and scroll if overflow */}
            <div className="flex-1 flex flex-col items-center justify-start bg-white rounded-b-2xl shadow-sm px-8 pt-6 relative">
                <div className="w-full max-w-6xl flex-1 overflow-y-auto text-base font-normal text-left" style={{ minHeight: 320, maxHeight: 550 }}>
                    {steps[activeStep].content}
                </div>
                {/* Navigation inside content, always at bottom right of content area */}
                <div className="w-full max-w-6xl flex justify-between items-center gap-4 absolute left-1/2 -translate-x-1/2" style={{ bottom: 0, padding: '15px 0px 24px 0px' }}>
                    <button
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        className="px-6 py-2 bg-gray-200 text-gray-600 rounded font-semibold disabled:opacity-50 transition-all duration-150 ml-8"
                    >
                        Back
                    </button>
                    {activeStep === steps.length - 1 ? (
                        <button
                            onClick={() => alert("Stepper Finished!")}
                            className="px-6 py-2 bg-green-600 text-white rounded font-semibold shadow-md hover:bg-green-700 transition-all duration-150 mr-8"
                        >
                            Finish
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 bg-brand-blue text-white rounded font-semibold shadow-md hover:bg-brand-dark-blue transition-all duration-150 mr-8"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stepper;
