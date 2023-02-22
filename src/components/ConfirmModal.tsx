import React from 'react';
interface AppProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalFunction: () => Promise<void>;
  headingMessage: string;
  bodyMessage: string;
}

function ConfirmModal({
  setShowModal,
  modalFunction,
  headingMessage,
  bodyMessage,
}: AppProps) {
  const onClickHandle = (action: string) => {
    if (action === 'confirm') {
      modalFunction();
    }
    setShowModal(false);
  };

  return (
    <div className='modal modal-bottom sm:modal-middle modal-open'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>{headingMessage}</h3>
        <p className='py-4'>{bodyMessage}</p>
        <div className='modal-action'>
          <button
            onClick={() => onClickHandle('cancel')}
            className='btn btn-warning'
          >
            Cancel
          </button>
          <button
            onClick={() => onClickHandle('confirm')}
            className='btn btn-success'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
