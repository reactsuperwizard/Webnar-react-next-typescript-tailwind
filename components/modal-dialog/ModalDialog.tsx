import { ReactNode, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type ModalDialogProps = {
  children?: ReactNode;
  open?: boolean;
  setOpen?: Function;
};

export const ModalDialog = ({ children, open, setOpen }: ModalDialogProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" tw="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div tw="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div tw="fixed inset-0 overflow-y-auto">
          <div tw="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {children}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
