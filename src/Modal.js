import React from "react";
import ReactTooltip from "react-tooltip";

export default function Modal(props) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="sm:relative">
      <ReactTooltip backgroundColor="#1d4ed8" />
      <div
        className="absolute md:top-2 md:right-2 top-2 right-7 cursor-pointer hover:animate-pulse"
        data-tip="More info"
        onClick={() => setShowModal(true)}
      >
        <svg
          className="animate-bounce w-5 h-5 "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
        <svg
          className="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto md:fixed md:inset-0 left:0 absolute z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-3xl text-gray-600  font-semibold uppercase">
                    More information
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                {/*body*/}
                <div className="relative px-6 py-3 flex-auto my-4 text-gray-600  leading-relaxed">
                  <h2 className="text-2xl pb-3 font-bold underline">Why?</h2>
                  <p>
                    I have been doing a react course and I wanted to take some
                    of what I have learnt and put it to use. Covid-19
                    vaccinations have been going on at an impressive rate around
                    the world and I thought that this would be a fun way to show
                    the pace that vaccications are happening in the U.K.
                  </p>
                  <h2 className="text-2xl py-3 font-bold underline">Data</h2>
                  <p>
                    I use data from{" "}
                    <a
                      className="underline"
                      target="_blank"
                      rel="noreferrer"
                      href="https://coronavirus.data.gov.uk/details/vaccinations"
                    >
                      United Kingdom's Covid-19 Dashboard
                    </a>
                    . The way I am calculating the data is probably not the most
                    accurate but this was for a bit of fun. I take the amount of
                    cases at the end of the previous day. Then use the seven day
                    average and the difference in time between the stats being
                    released and the current time to work out how many people
                    are being vaccinated per second. This is not perfect because
                    vaccines are not happening at the same rate at all hours of
                    the day.
                  </p>
                  <h2 className="text-2xl py-3 font-bold underline">
                    Future Changes
                  </h2>
                  <p>Here are a list of things I am thinking of adding.</p>
                  <ul className=" py-3 list-disc list-inside">
                    <li className="line-through">
                      Full Dosing I am currently only including information
                      about the first dose.
                    </li>
                    <li>
                      Other countries apart from the U.K. Maybe the U.S.A. or
                      the whole of the E.U.
                    </li>
                    <li>
                      Looking into getting the data from API's so I do not have
                      to update the data manually.
                    </li>
                  </ul>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="rounded px-3 py-2 m-1 bg-blue-700 uppercase"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
