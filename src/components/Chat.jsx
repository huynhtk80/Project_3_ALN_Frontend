import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const firebase = useContext(FirebaseContext);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await firebase.rtdb.collection('messages').add({
      text: newMessage,
      createdAt: firebase.rtdb.FieldValue.serverTimestamp(),
    });
    setNewMessage('');
  };

  return user ? (
    <div
      className={`fixed bottom-0 right-0 ${
        isOpen ? 'w-72' : 'w-72 h-0 pb-10'
      } bg-primary-focus text-base-content p-5 m-2 border border-primary rounded-lg shadow-lg bg-opacity-80 transition-all duration-300 z-50`}
    >
      <header className=' flex flex-row justify-between'>
        <h2 className='text-md text-primary-content'>ALN Chat</h2>
        <button className='btn btn-xs btn-square' onClick={handleToggle}>
          {isOpen ? 'X' : '-'}
        </button>
      </header>
      {isOpen && (
        <>
          <div className='h-64 w-96 overflow-y-scroll'>
            <ul>
              {messages.map((message) => (
                <li key={message.id} className='text-sm pb-2'>
                  {message.text}
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={handleSubmit} className='pt-4'>
            <input
              className='w-full p-2 border border-gray-300 rounded-lg'
              type='text'
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
            />
            <button
              className='w-full mt-2 p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500'
              type='submit'
              onClick={handleSubmit}
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  ) : null;
};

export default Chat;
