import React, { useState } from 'react';

function PopupCard() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!isOpen)}>Open Popup</button>
      {isOpen && (
        <div className='bg-white rounded-lg p-4'>
          <h2 className='text-lg font-medium'>Popup Title</h2>
          <p>Popup Content</p>
        </div>
      )}
    </>
  );
}

export default PopupCard;
