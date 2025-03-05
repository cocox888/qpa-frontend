export const PhaseSVGForSMM = (index: string) => {

  if (index == "completed") {
    return (
      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">

        <svg
          className="w-4 h-4 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    )
  } else if (index == "progress") {
    return (
      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
      </div>
    )

  } else if (index == "upcoming") {
    return (
      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-400 rounded-full" />
      </div>
    )

  }

};


export const PhaseSVGForWDS = (index: string) => {

  if (index == "completed") {
    return (
      <svg
        className="w-5 h-5 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    )
  } else if (index == "progress") {
    return (
      <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
      </div>
    )

  } else if (index == "upcoming") {
    return (
      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
    )

  }

};