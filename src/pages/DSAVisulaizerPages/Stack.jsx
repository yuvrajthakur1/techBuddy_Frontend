import React, { useState } from 'react';

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [peekValue, setPeekValue] = useState(null);

  const animationDelay = 200; // in milliseconds

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  // Handles adding an element to the top of the stack
  const handlePush = async () => {
    if (inputValue.trim() === '') {
      setErrorMessage('Please enter a value to push.');
      return;
    }
    setErrorMessage('');
    setIsAnimating(true);
    setPeekValue(null);

    const newValue = inputValue;
    const newStack = [...stack];

    // Animate the new element appearing and sliding into place
    const tempStack = [...newStack, { value: newValue, key: Date.now(), isAnimating: true }];
    setStack(tempStack);
    await delay(animationDelay);
    
    setStack(newStack => newStack.map(item => ({...item, isAnimating: false})));
    await delay(animationDelay);
    
    setStack([...newStack, { value: newValue, key: Date.now() }]);
    setInputValue('');
    setIsAnimating(false);
  };

  // Handles removing the top element from the stack
  const handlePop = async () => {
    if (stack.length === 0) {
      setErrorMessage('Stack is empty. Cannot pop.');
      return;
    }
    setErrorMessage('');
    setIsAnimating(true);
    setPeekValue(null);

    const newStack = [...stack];
    newStack.pop();
    
    setStack(newStack);
    await delay(animationDelay);

    setIsAnimating(false);
  };

  // Handles viewing the top element without removing it
  const handlePeek = () => {
    if (stack.length === 0) {
      setErrorMessage('Stack is empty. Cannot peek.');
      setPeekValue(null);
      return;
    }
    setErrorMessage('');
    const topElement = stack[stack.length - 1].value;
    setPeekValue(topElement);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-extrabold text-white text-center mb-6">Stack Visualizer</h1>
        <p className="lg:text-lg mg:text-md text-sm text-gray-400 text-center mb-8">
          A stack follows a LIFO (Last-In, First-Out) principle.
        </p>
        
        <div className="flex flex-col gap-4 mb-8 p-4 border border-gray-700 rounded-lg">
          <h2 className="lg:text-2xl md:text-xl text-lg text-center font-bold text-white mb-2">Stack Operations</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value to push"
              className="w-full bg-gray-700 text-gray-200 py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              disabled={isAnimating}
            />
            <button
              onClick={handlePush}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              disabled={isAnimating}
            >
              Push
            </button>
            <button
              onClick={handlePop}
              className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              disabled={isAnimating}
            >
              Pop
            </button>
            <button
              onClick={handlePeek}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              disabled={isAnimating}
            >
              Peek
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-400 text-center mb-4">{errorMessage}</div>
        )}
        
        {peekValue !== null && (
          <div className="text-yellow-400 text-center mb-4">Top of stack: {peekValue}</div>
        )}

        {/* Stack Visualization */}
        <div className="flex flex-col-reverse gap-5 items-center justify-center mt-8 min-h-[250px] ">
         
          {stack.map((item, index) => (
            <div
              key={item.key}
              className={`flex items-center justify-center w-full max-w-[200px] h-16 my-1 rounded-md shadow-md bg-blue-600 text-white text-lg font-bold transform transition-transform duration-500 ease-in-out
              ${item.isAnimating ? 'opacity-0 scale-y-0 translate-y-16' : 'opacity-100 scale-y-100'}`}
            >
              {item.value}
            </div>
          ))}
           <div className="pb-7 flex justify-center items-center text-gray-400 text-sm">
             <p className='text-lg text-green-600 font-bold'>Top</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;
