import React, { useState } from 'react';

const PriorityQueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputPriority, setInputPriority] = useState('');
  const [message, setMessage] = useState('');

  const enqueue = () => {
    if (inputValue.trim() === '' || inputPriority.trim() === '') {
      setMessage('Please enter a value and a priority.');
      return;
    }
    const priority = parseInt(inputPriority);
    if (isNaN(priority)) {
      setMessage('Priority must be a number.');
      return;
    }

    const newItem = {
      value: inputValue.trim(),
      priority,
    };

    const newQueue = [...queue, newItem];
    newQueue.sort((a, b) => b.priority - a.priority); // Sort by priority, highest first
    setQueue(newQueue);
    setInputValue('');
    setInputPriority('');
    setMessage(`Element "${newItem.value}" with priority ${newItem.priority} added.`);
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage('Priority Queue is empty!');
      return;
    }

    const newQueue = [...queue];
    const removedItem = newQueue.shift();
    setQueue(newQueue);
    setMessage(`Element "${removedItem.value}" with priority ${removedItem.priority} removed.`);
  };

  const peek = () => {
    if (queue.length === 0) {
      setMessage('Priority Queue is empty! No element to peek at.');
      return;
    }
    const highestPriorityItem = queue[0];
    setMessage(`Peeking at the highest priority element: "${highestPriorityItem.value}" with priority ${highestPriorityItem.priority}.`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center p-8">
      <h1 className="lg:text-3xl md:text-2xl text-xl font-extrabold text-white text-center mb-6">Priority Queue Visualizer</h1>
      <p className="lg:text-lg md:text-md text-base text-gray-400 text-center mb-8">
        A Priority Queue serves elements based on priority, not insertion time.
      </p>

      {/* Operations Container */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-4xl mb-8">
        <h2 className="lg:text-2xl md:text-xl text-md font-bold text-white mb-4 text-center">Operations</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="w-full lg:text-lg md:text-md text-base md:w-1/3 bg-gray-700 text-gray-200 py-2 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          />
          <input
            type="number"
            value={inputPriority}
            onChange={(e) => setInputPriority(e.target.value)}
            placeholder="Enter priority (number)"
            className="w-full md:w-1/3 lg:text-lg md:text-md text-base bg-gray-700 text-gray-200 py-2 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
          <button
            onClick={enqueue}
            className={`bg-blue-600 w-full lg:text-lg md:text-md text-base hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${!inputValue.trim() || !inputPriority.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!inputValue.trim() || !inputPriority.trim()}
          >
            Enqueue
          </button>
          <button
            onClick={dequeue}
            className={`bg-red-600 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${queue.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={queue.length === 0}
          >
            Dequeue
          </button>
          <button
            onClick={peek}
            className={`bg-green-600 w-full lg:text-lg md:text-md text-base hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 ${queue.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={queue.length === 0}
          >
            Peek
          </button>
        </div>
        {message && (
          <div className={`mt-4 text-center lg:text-lg md:text-md text-base font-semibold ${message.includes('Queue is empty') || message.includes('must be a number') ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </div>
        )}
      </div>

      {/* Visualization Container */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-6xl">
        <h2 className="mdlg:text-2xl md:text-xl text- font-bold text-white mb-4 text-center">Queue State</h2>
        <div className="relative w-full flex flex-col justify-center items-center p-4">
          {queue.length === 0 ? (
            <div className="text-gray-400 lg:text-lg md:text-md text-base">Priority Queue is empty.</div>
          ) : (
            queue.map((item, index) => (
              <div
                key={index}
                className="w-64 p-4 m-2 bg-blue-500 border-2 border-blue-400 rounded-lg shadow-md flex items-center justify-between transition-all duration-300 ease-in-out"
              >
                <div className="font-bold text-lg text-white">{item.value}</div>
                <div className="text-sm font-semibold text-gray-200">
                  Priority: <span className="font-bold">{item.priority}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PriorityQueueVisualizer;
