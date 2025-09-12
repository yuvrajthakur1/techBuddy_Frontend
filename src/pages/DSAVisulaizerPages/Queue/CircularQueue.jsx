import React, { useState, useEffect } from 'react';

const CircularQueueVisualizer = () => {
  const maxSize = 5;
  const [queueArray, setQueueArray] = useState(Array(maxSize).fill(null));
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const enqueue = async () => {
    if ((rear + 1) % maxSize === front) {
      setMessage('Queue is full!');
      return;
    }
    setIsAnimating(true);
    setMessage('Adding element...');

    const newQueue = [...queueArray];
    let newRear = -1;

    if (front === -1) {
      newRear = 0;
      setFront(0);
      setRear(0);
    } else {
      newRear = (rear + 1) % maxSize;
      setRear(newRear);
    }

    newQueue[newRear] = inputValue;
    setQueueArray(newQueue);
    setInputValue('');
    setMessage('Element added successfully.');
    setIsAnimating(false);
  };

  const dequeue = async () => {
    if (front === -1) {
      setMessage('Queue is empty!');
      return;
    }
    setIsAnimating(true);
    setMessage('Removing element...');

    const newQueue = [...queueArray];
    newQueue[front] = null;
    setQueueArray(newQueue);

    if (front === rear) {
      setFront(-1);
      setRear(-1);
    } else {
      setFront((front + 1) % maxSize);
    }

    setMessage('Element removed successfully.');
    setIsAnimating(false);
  };

  const peek = () => {
    if (front === -1) {
      setMessage('Queue is empty!');
    } else {
      setMessage(`Front element is: ${queueArray[front]}`);
    }
  };

  const isFull = (rear + 1) % maxSize === front;
  const isEmpty = front === -1;

  return (
    <div className="min-h[70vh] bg-gray-950 text-gray-100 flex flex-col gap-2 items-center p-4">
     <div className='bg-gray-800 p-2 rounded-md'>
       <h1 className="lg:text-3xl md:text-2xl text-xl  font-extrabold text-white text-center mb-6">Circular Queue Visualizer</h1>
      <p className="lg:text-lg md:text-md text-base text-gray-400 text-center mb-8">
        A circular queue is a FIFO data structure where the last element connects to the first, allowing for efficient use of a fixed-size buffer.
      </p>
     </div>

      {/* Operations Container */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-4xl mb-8">
        <h2 className="lg:text-2xl md:text-xl text-lg font-bold text-white mb-4">Operations</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="w-full md:w-1/3 lg:text-md md:text-base text-sm bg-gray-700 text-gray-200 py-2 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            disabled={isAnimating}
          />
          <button
            onClick={enqueue}
            disabled={isFull || !inputValue.trim() || isAnimating}
            className={`bg-blue-600 hover:bg-blue-700 lg:text-md md:text-base text-sm text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${isFull || !inputValue.trim() || isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Enqueue
          </button>
          <button
            onClick={dequeue}
            disabled={isEmpty || isAnimating}
            className={`bg-red-600 hover:bg-red-700 lg:text-md md:text-base text-sm text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${isEmpty || isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Dequeue
          </button>
          <button
            onClick={peek}
            disabled={isEmpty || isAnimating}
            className={`bg-green-600 hover:bg-green-700 lg:text-md md:text-base text-sm text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${isEmpty || isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Peek
          </button>
        </div>
        {message && (
          <div className={`mt-4 text-center lg:text-md md:text-base text-sm font-semibold ${message.includes('full') || message.includes('empty') ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </div>
        )}
      </div>

      {/* Visualization Container */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-6xl">
        <h2 className="lg:text-2xl md:text-xl text-md font-bold text-white  mb-4 text-center">Queue State</h2>
        <div className="flex justify-center items-end relative  overflow-x-auto">
          {queueArray.map((item, index) => (
            <div key={index} className="flex flex-col items-center mx-3 my-8 relative">
              <div
                className={`md:w-16 md:h-16 w-10 h-10  rounded-lg shadow-md flex items-center justify-center font-bold text-lg border-2
                  ${item === null ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-blue-500 border-blue-400 text-white'}
                  ${index === front && !isEmpty ? 'bg-green-500 border-green-400' : ''}
                  ${index === rear && !isEmpty ? 'bg-red-500 border-red-400' : ''}
                `}
              >
                {item !== null ? item : ''}
              </div>
              <span className="mt-2 text-sm font-bold text-gray-400">{index}</span>
              
              {index === front && !isEmpty && (
                <span className="absolute -top-6 text-sm font-bold text-green-500">FRONT</span>
              )}
              {index === rear && !isEmpty && (
                <span className="absolute -bottom-6 text-sm font-bold text-red-500">REAR</span>
              )}
            </div>
          ))}
          {/* Circular Connection Line */}
          {!isEmpty && (
            <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 -z-10">
              <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0 50 Q 50 100 100 50" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CircularQueueVisualizer;
