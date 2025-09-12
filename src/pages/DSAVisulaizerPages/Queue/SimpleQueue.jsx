import React, { useState } from 'react';

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [peekIndex, setPeekIndex] = useState(null);

  const animationDelay = 300; // in milliseconds
  const MAX_QUEUE_SIZE = 10;

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  // Handles adding an element to the back of the queue (Enqueue)
  const handleEnqueue = async () => {
    if (inputValue.trim() === '') {
      setErrorMessage('Please enter a value to enqueue.');
      return;
    }
    if (queue.length >= MAX_QUEUE_SIZE) {
      setErrorMessage('Queue is full. Cannot enqueue.');
      return;
    }

    setErrorMessage('');
    setIsAnimating(true);
    setPeekIndex(null);

    const newValue = inputValue;
    const newQueue = [...queue];

    // Animate the new element appearing and sliding into place
    const tempQueue = [...newQueue, { value: newValue, key: Date.now(), isAnimating: true }];
    setQueue(tempQueue);
    await delay(animationDelay);
    
    setQueue([...newQueue, { value: newValue, key: Date.now() }]);
    setInputValue('');
    setIsAnimating(false);
  };

  // Handles removing the front element from the queue (Dequeue)
  const handleDequeue = async () => {
    if (queue.length === 0) {
      setErrorMessage('Queue is empty. Cannot dequeue.');
      return;
    }
    setErrorMessage('');
    setIsAnimating(true);
    setPeekIndex(null);

    // Animate the element leaving
    setQueue(prevQueue => {
      const newQueue = [...prevQueue];
      newQueue[0] = { ...newQueue[0], isLeaving: true };
      return newQueue;
    });

    await delay(animationDelay);
    
    const newQueue = [...queue];
    newQueue.shift();
    setQueue(newQueue);
    
    setIsAnimating(false);
  };

  // Handles viewing the front element without removing it (Peek)
  const handlePeek = () => {
    if (queue.length === 0) {
      setErrorMessage('Queue is empty. Cannot peek.');
      setPeekIndex(null);
      return;
    }
    setErrorMessage('');
    setPeekIndex(0);
  };

  const handleClear = () => {
    setQueue([]);
    setErrorMessage('');
    setPeekIndex(null);
  };

  return (
    <div className="min-h[70vh] bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-2xl">
        <h1 className="lg:text-3xl md:text-2xl text-xl font-extrabold text-white text-center mb-6">Queue Visualizer</h1>
        <p className="lg:text-lg md:text-md text-sm text-gray-400 text-center mb-8">
          A queue follows a FIFO (First-In, First-Out) principle.
        </p>
        
        <div className="flex flex-col gap-4 mb-8 p-4 border border-gray-700 rounded-lg">
          <h2 className="lg:text-2xl md:text-xl text-lg font-bold text-white mb-2">Queue Operations</h2>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value to enqueue"
            className="w-full bg-gray-700 lg:text-md md:text-base text-sm text-gray-200 py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            disabled={isAnimating}
          />
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button
              onClick={handleEnqueue}
              className={`w-full md:w-auto lg:text-md md:text-base text-sm text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 
                ${queue.length >= MAX_QUEUE_SIZE ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}`}
              disabled={isAnimating || queue.length >= MAX_QUEUE_SIZE}
            >
              Enqueue
            </button>
            <button
              onClick={handleDequeue}
              className={`w-full md:w-auto lg:text-md md:text-base text-sm text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 
                ${queue.length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'}`}
              disabled={isAnimating || queue.length === 0}
            >
              Dequeue
            </button>
            <button
              onClick={handlePeek}
              className={`w-full md:w-auto lg:text-md md:text-base text-sm text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 
                ${queue.length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'}`}
              disabled={isAnimating || queue.length === 0}
            >
              Peek
            </button>
            <button
                onClick={handleClear}
                className={`w-full md:w-auto text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 lg:text-md md:text-base text-sm  ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 
                ${queue.length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'}`}
                disabled={isAnimating || queue.length === 0}
            >
                Clear Queue
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-400 lg:text-md md:text-base text-sm text-center mb-4">{errorMessage}</div>
        )}
        
        {peekIndex !== null && (
          <div className="text-yellow-400 lg:text-md md:text-base text-sm text-center mb-4">Front of queue: {queue[peekIndex].value}</div>
        )}
        
        {/* Live operation feedback */}
        {isAnimating && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg">
                {isAnimating && 'Processing...'}
            </div>
        )}
        
        {queue.length >= MAX_QUEUE_SIZE && (
          <div className="text-red-400 lg:text-md md:text-base text-sm text-center mb-4">Queue is full (max {MAX_QUEUE_SIZE} elements)</div>
        )}

        {/* Queue Visualization */}
        <div className="flex flex-col items-center mt-8 min-h-[250px]">
          <div className="flex justify-between w-full max-w-lg mb-2 text-gray-400 text-sm px-4">
            <span>Front</span>
            <span>Rear</span>
          </div>
          <div className="flex flex-row items-center overflow-x-auto p-4 gap-2 border border-gray-700 rounded-lg w-full max-w-lg">
            {queue.map((item, index) => (
              <div
                key={item.key}
                className={`flex items-center justify-center w-32 h-16 rounded-md shadow-md text-white text-lg font-bold
                transform transition-all duration-500 ease-in-out
                ${item.isLeaving ? 'opacity-0 -translate-x-full' : ''}
                ${item.isAnimating ? 'opacity-0 scale-x-0 translate-x-16' : ''}
                ${index === peekIndex ? 'bg-green-500' : 'bg-blue-600'}
                ${queue.length === 0 ? 'hidden' : ''}
                `}
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
