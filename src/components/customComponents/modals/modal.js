"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useModalStore from "../../../store/modal/modalState";
import { ForgetPass } from "./authModal/authModals";

export function Modal() {
  const { isModalShown, showModal, hideModal, modalContent } = useModalStore(
    (state) => ({
      isModalShown: state.isModalShown,
      modalContent: state.modalContent,
      showModal: state.showModal,
      hideModal: state.hideModal,
    })
  );
  const preventCloseOnClickOutside =
    modalContent && modalContent.type === ForgetPass;
  return (
    <div>
      <Transition appear show={isModalShown} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            // Allow closing modal only if showModal was called to open it
            if (!preventCloseOnClickOutside && isModalShown) {
              hideModal();
            }
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed  inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-fit z-60   transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all">
                  <div>{modalContent}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
