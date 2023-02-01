import React from 'react';
interface AppProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ showModal, setShowModal }: AppProps) {
  const onClickHandle = (action: string) => {
    if (action === 'confirm') {
    }
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className='modal modal-bottom sm:modal-middle modal-open'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>Title</h3>
        <p className='py-4'>Body</p>
        <div className='modal-action'>
          <button
            onClick={() => onClickHandle('cancel')}
            className='btn btn-primary'
          >
            Cancel
          </button>
          <button
            onClick={() => onClickHandle('confirm')}
            className='btn btn-warning'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
