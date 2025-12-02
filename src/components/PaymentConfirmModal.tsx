import React from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
}

const PaymentConfirmModal: React.FC<Props> = ({ open, setOpen, onConfirm }) => {
  return (
    <div className={`modal ${open ? "modal-open" : ""}`} role="dialog">
      <div className="modal-box p-6 bg-white rounded-2xl shadow-2xl">
        <h3 className="text-xl font-bold mb-4">Confirm Payment</h3>

        <p className="py-4 text-sm text-gray-600">
          Are you sure you want to continue with this payment?
        </p>

        <div className="modal-action flex justify-end gap-2">
          <button
            className="btn btn-outline btn-sm text-red-800"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Yes, Pay
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setOpen(false)}>close</button>
      </form>
    </div>
  );
};

export default PaymentConfirmModal;

