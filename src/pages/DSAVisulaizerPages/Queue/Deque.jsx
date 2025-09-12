import React, { useState } from 'react';

const DequeVisualizer = () => {
  const [deque, setDeque] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const addFront = () => {
    if (inputValue.trim() === '') {
      setMessage('Please enter a value to add.');
      return;
    }
    setDeque(prevDeque => [inputValue.trim(), ...prevDeque]);
    setInputValue('');
    setMessage(`Added "${inputValue.trim()}" to the front.`);
  };

  const addRear = () => {
    if (inputValue.trim() === '') {
      setMessage('Please enter a value to add.');
      return;
    }
    setDeque(prevDeque => [...prevDeque, inputValue.trim()]);
    setInputValue('');
    setMessage(`Added "${inputValue.trim()}" to the rear.`);
  };

  const removeFront = () => {
    if (deque.length === 0) {
      setMessage('Deque is empty! Cannot remove from the front.');
      return;
    }
    const removedValue = deque[0];
    setDeque(prevDeque => prevDeque.slice(1));
    setMessage(`Removed "${removedValue}" from the front.`);
  };

  const removeRear = () => {
    if (deque.length === 0) {
      setMessage('Deque is empty! Cannot remove from the rear.');
      return;
    }
    const removedValue = deque[deque.length - 1];
    setDeque(prevDeque => prevDeque.slice(0, -1));
    setMessage(`Removed "${removedValue}" from the rear.`);
  };

  return (
    <div className="min-h-screen  bg-gray-950 text-gray-100 flex flex-col items-center p-10">
      <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-white text-center mb-6">Double-Ended Queue (Deque) Visualizer</h1>
      <p className="lg:text-lg md:text-md text-sm text-gray-400 text-center mb-8">
        A Deque allows elements to be added or removed from both the front and the rear.
      </p>

      {/* Operations Container */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-4xl mb-8">
        <h2 className="lg:text-2xl md:text-xl textlg font-bold text-white mb-4 text-center">Operations</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="w-full md:w-1/3 bg-gray-700 lg:text-lg md:text-md text-base text-gray-200 py-2 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          />
        </div>
        <div className="flex flex-col  md:flex-row items-center justify-center gap-4 mt-4">
          <button
            onClick={addFront}
            className={`bg-blue-600 w-full hover:bg-blue-700 lg:text-md md:text-base text-sm text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${!inputValue.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!inputValue.trim()}
          >
            Add Front
          </button>
          <button
            onClick={addRear}
            className={`bg-blue-600 w-full lg:text-md md:text-base text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${!inputValue.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!inputValue.trim()}
          >
            Add Rear
          </button>
          <button
            onClick={removeFront}
            className={`bg-red-600 w-full   lg:text-md md:text-base text-sm hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${deque.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={deque.length === 0}
          >
            Remove Front
          </button>
          <button
            onClick={removeRear}
            className={`bg-red-600 w-full hover:bg-red-700  lg:text-md md:text-base text-sm text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${deque.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={deque.length === 0}
          >
            Remove Rear
          </button>
        </div>
        {message && (
          <div className={`mt-4 text-center  lg:text-md md:text-base text-sms font-semibold ${message.includes('empty') ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </div>
        )}
      </div>

      {/* Visualization Container */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-6xl">
        <h2 className="lg:text-2xl md:text-lg text-base font-bold text-white mb-4 text-center">Deque State</h2>
        <div className="relative w-full flex flex-row items-center justify-center p-4 flex-wrap">
          {deque.length === 0 ? (
            <div className="text-gray-400 text-lg">Deque is empty.</div>
          ) : (
            <div className="flex items-center">
              <span className="font-bold lg:text-md md:text-base text-sm text-green-400 absolute left-0 -top-8">FRONT</span>
              {deque.map((item, index) => (
                <div
                  key={index}
                  className="lg:w-32 md:w-24 sm:w-16 w-12 p-4 m-2 bg-blue-500 border-2 border-blue-400 rounded-lg shadow-md flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <div className="font-bold lg:text-lg md:text-md text-base text-white">{item}</div>
                </div>
              ))}
              <span className="font-bold lg:text-md md:text-base text-sm text-green-400 absolute right-0 -top-8">REAR</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DequeVisualizer;
