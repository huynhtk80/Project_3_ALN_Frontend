import React from 'react';
interface AppProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteFunction: () => Promise<void>;
}

function DeleteModal({ setShowModal, deleteFunction }: AppProps) {
  const onClickHandle = (action: string) => {
    if (action === 'delete') {
      deleteFunction();
    }
    setShowModal(false);
  };

  return (
    <div className='modal modal-bottom sm:modal-middle modal-open'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>Delete Video!</h3>
        <p className='py-4'>
          This Process cannot be reversed. Are you sure you want to delete this
          video?
        </p>
        <div className='modal-action'>
          <button
            onClick={() => onClickHandle('cancel')}
            className='btn btn-primary'
          >
            Cancel
          </button>
          <button
            onClick={() => onClickHandle('delete')}
            className='btn btn-warning'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
