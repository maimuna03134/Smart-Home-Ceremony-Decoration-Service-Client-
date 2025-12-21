import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
const BecomeDecoratorModal = ({ closeModal, isOpen }) => {
  const { user } = useAuth();
  const handleRequest = async () => {
    try {
      await axios.get(
        `https://smart-home-and-ceremony-decoration.vercel.app/become-seller/${user?.email}`
      );
      toast.success("Request sent, please wait for admin approval!");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    } finally {
      closeModal();
    }
  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Become A Decorator!
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Please read all the terms & conditions before becoming a
                decorator.
              </p>
            </div>
            <hr className="mt-8 " />
            <div className="flex mt-2 justify-around">
              <button
                onClick={handleRequest}
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-primary hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Continue
              </button>
              <button
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default BecomeDecoratorModal;
