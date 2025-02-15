import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function HolidayModal({ holiday, onClose }) {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-gray-900 bg-opacity-50 backdrop-blur-lg p-6 text-left align-middle shadow-2xl border border-gray-600">
               
                <Dialog.Title as="h3" className="text-lg font-semibold text-gray-50">
                  {holiday.name}
                </Dialog.Title>

                
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-300">
                    <strong className="text-gray-100">Date:</strong> {new Date(holiday.date).toDateString()}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong className="text-gray-100">Type:</strong> {holiday.type}
                  </p>
                  {holiday.description && (
                    <p className="text-sm text-gray-300 mt-2">{holiday.description}</p>
                  )}
                </div>

                
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-full bg-cyan-500 py-2 px-6 text-sm font-semibold text-white shadow-md hover:bg-cyan-600 transition-all duration-300"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
