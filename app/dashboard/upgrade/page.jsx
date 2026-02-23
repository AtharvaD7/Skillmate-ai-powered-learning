import React from "react";
import { Check } from "lucide-react"; // Importing the check icon from Lucide React

function Upgrade() {
  const plans = [
    {
      title: "Free",
      price: "0$",
      features: [
        "Generate up to 5 courses",
        "Basic support",
        "Email support",
        "Help center access",
      ],
      buttonText: "Current Plan",
      isCurrent: true,
    },
    {
      title: "Premium",
      price: "9.99$",
      features: [
        "Unlimited course generation",
        "Unlimited s & quizzes",
        "Priority email support",
        "Full access to help center",
      ],
      buttonText: "Upgrade Now",
      isCurrent: false,
      isRecommended: true,
    },
  ];

  return (
    <div className="p-3.5"> {/* Reduced padding and margin-top */}
      {/* Title & Description Moved to Top-Left */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Subscription Plans</h2>
        <p className="text-gray-600 mt-1 text-medium">
          Unlock premium features and enhance your learning experience.
        </p>
      </div>

      {/* Plans Section - Flexbox for Proper Alignment */}
      <div className="mt-2 flex gap-6 justify-center items-center">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col ${
              plan.isRecommended ? "h-[460px]" : "h-[400px] self-center"
            }`}
          >
            {/* Recommended Label (Full-width Top Bar) */}
            {plan.isRecommended && (
              <div className="absolute top-0 left-0 w-full bg-blue-700 text-white text-sm font-bold text-center py-2 rounded-t-xl">
                RECOMMENDED
              </div>
            )}

            {/* Plan Card */}
            <div
              className={`flex flex-col justify-between rounded-xl p-6 text-center shadow-lg bg-white ${
                plan.isRecommended
                  ? "border-4 border-blue-700 pt-14"
                  : "border border-gray-300"
              } w-80 h-full`}
            >
              <div>
                <h3 className="text-2xl font-semibold">{plan.title}</h3>
                <p className="text-3xl font-bold mt-1">
                  {plan.price} <span className="text-gray-500 text-lg">/month</span>
                </p>

                <ul className="mt-4 text-gray-700 space-y-2 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="text-green-600" size={20} /> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`mt-4 w-full py-3 rounded-lg text-lg ${
                  plan.isCurrent
                    ? "text-blue-600 font-semibold cursor-default border border-blue-600"
                    : "bg-blue-700 text-white hover:bg-blue-800"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upgrade;
