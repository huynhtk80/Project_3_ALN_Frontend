import React, { useState } from 'react';
interface AppProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalFunction: (inputMsg: string) => Promise<void>;
  headingMessage: string;
  bodyMessage: string;
  inputLabel: string;
}

function ConfirmModalInputMsg({
  setShowModal,
  modalFunction,
  headingMessage,
  bodyMessage,
  inputLabel,
}: AppProps) {
  const [inputMsg, setInputMsg] = useState('');
  const onClickHandle = (action: string) => {
    if (action === 'confirm') {
      modalFunction(inputMsg);
    }
    setShowModal(false);
  };

  return (
    <div className='modal modal-bottom sm:modal-middle modal-open'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg'>{headingMessage}</h3>
        <p className='py-4'>{bodyMessage}</p>
        <div className='form-control'>
          <label className='label'>
            <span className='label-text'>{inputLabel}</span>
          </label>
          <textarea
            onChange={(e) => setInputMsg(e.target.value)}
            className='textarea textarea-bordered h-24'
            placeholder={inputLabel}
          ></textarea>
        </div>

        <div className='modal-action'>
          <button
            onClick={() => onClickHandle('cancel')}
            className='btn btn-warning'
          >
            Cancel
          </button>
          <button
            onClick={() => onClickHandle('confirm')}
            className='btn btn-error'
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModalInputMsg;
