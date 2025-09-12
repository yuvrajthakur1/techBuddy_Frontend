import React, { useState } from 'react';

// The delay function is used to create a pause for animation
const delay = (ms) => new Promise(res => setTimeout(res, ms));

const SinglyLinkedListVisualizer = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // A function to create a new node object with a unique, random hex address
  const createNode = (value) => ({
    value,
    address: '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase(),
    key: Date.now() + Math.random(),
    isAdding: false,
    isDeleting: false,
  });

  // Handles adding an element to the end of the list (Append)
  const handleAppend = async () => {
    if (inputValue.trim() === '') {
      setErrorMessage('Please enter a value to append.');
      return;
    }
    
    setErrorMessage('');
    setIsAnimating(true);
    const newNode = createNode(inputValue);

    setList(prevList => [...prevList, { ...newNode, isAdding: true }]);
    await delay(500);
    setList(prevList => prevList.map(node => ({ ...node, isAdding: false })));

    setInputValue('');
    setIsAnimating(false);
  };

  // Handles adding an element to the beginning of the list (Prepend)
  const handlePrepend = async () => {
    if (inputValue.trim() === '') {
      setErrorMessage('Please enter a value to prepend.');
      return;
    }
    
    setErrorMessage('');
    setIsAnimating(true);
    const newNode = createNode(inputValue);

    setList(prevList => [{ ...newNode, isAdding: true }, ...prevList]);
    await delay(500);
    setList(prevList => prevList.map(node => ({ ...node, isAdding: false })));
    
    setInputValue('');
    setIsAnimating(false);
  };

  // Handles inserting an element at a specific index
  const handleInsertAtIndex = async () => {
    const index = parseInt(inputIndex);
    if (isNaN(index) || index < 0 || index > list.length) {
      setErrorMessage('Please enter a valid index.');
      return;
    }
    if (inputValue.trim() === '') {
      setErrorMessage('Please enter a value to insert.');
      return;
    }
    
    setErrorMessage('');
    setIsAnimating(true);
    const newNode = createNode(inputValue);
    
    const newList = [...list];
    newList.splice(index, 0, { ...newNode, isAdding: true });
    setList(newList);
    
    await delay(500);
    setList(prevList => prevList.map(node => ({ ...node, isAdding: false })));
    
    setInputValue('');
    setInputIndex('');
    setIsAnimating(false);
  };

  // Handles deleting an element at a specific index
  const handleDeleteAtIndex = async () => {
    const index = parseInt(inputIndex);
    if (isNaN(index) || index < 0 || index >= list.length) {
      setErrorMessage('Please enter a valid index to delete.');
      return;
    }
    
    setErrorMessage('');
    setIsAnimating(true);
    const newList = [...list];
    newList[index].isDeleting = true;
    setList(newList);
    
    await delay(500);
    newList.splice(index, 1);
    setList(newList);
    
    setInputIndex('');
    setIsAnimating(false);
  };

  const handleClear = () => {
    setList([]);
    setErrorMessage('');
    setInputValue('');
    setInputIndex('');
    setIsAnimating(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-5xl">
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-extrabold text-white text-center mb-6">Singly Linked List Visualizer</h1>
        <p className="lg:text-lg md:text-md text-base text-gray-400 text-center mb-8">
          A Linked List uses nodes and pointers to store data.
        </p>

        <div className="flex flex-col gap-4 mb-8 p-4 border border-gray-700 rounded-lg">
          <h2 className="lg:text-2xl md:text-md text-base font-bold text-white mb-2">Operations</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Value"
              className="w-full md:w-1/3 bg-gray-700 text-gray-200 py-2 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              disabled={isAnimating}
            />
            <input
              type="number"
              value={inputIndex}
              onChange={(e) => setInputIndex(e.target.value)}
              placeholder="Index"
              className="w-full md:w-1/3 bg-gray-700 text-gray-200 py-2 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              disabled={isAnimating}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <button
              onClick={handleAppend}
              className={`bg-blue-600 lg:text-md md:text-base text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isAnimating}
            >
              Append
            </button>
            <button
              onClick={handlePrepend}
              className={`bg-green-600 lg:text-md md:text-base text-sm hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isAnimating}
            >
              Prepend
            </button>
            <button
              onClick={handleInsertAtIndex}
              className={`bg-purple-600 lg:text-md md:text-base text-sm hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isAnimating}
            >
              Insert at Index
            </button>
            <button
              onClick={handleDeleteAtIndex}
              className={`bg-red-600 lg:text-md md:text-base text-sm hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isAnimating}
            >
              Delete at Index
            </button>
            <button
              onClick={handleClear}
              className={`bg-gray-600 lg:text-md md:text-base text-sm hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isAnimating}
            >
              Clear List
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        <div className="mt-8 flex items-center justify-start overflow-x-auto p-4 border border-gray-700 rounded-lg">
          {list.length > 0 && (
            <div className="flex flex-col items-center mr-6">
              <span className="md:text-sm text-[10px] font-bold text-green-500">HEAD</span>
              <div className="w-16 h-8 text-center leading-8 bg-green-500 rounded-lg shadow-lg mt-2"></div>
            </div>
          )}
          
          {list.map((node, index) => (
            <React.Fragment key={node.key}>
              <div
                className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-blue-600 relative
                transform transition-all duration-500 ease-in-out ${node.isAdding ? 'opacity-0 translate-y-10' : ''} ${node.isDeleting ? 'opacity-0 scale-50 -translate-y-10' : ''}`}
              >
                <div className="text-sm text-gray-200 mb-1">Data: <span className="font-bold text-white">{node.value}</span></div>
                <div className="text-xs font-bold text-gray-300">Address: <span className="font-mono">{node.address}</span></div>
                <div className="text-sm text-gray-200 mt-2">Next: <span className="font-bold text-white">{index < list.length - 1 ? list[index + 1].address : 'Null'}</span></div>
              </div>
              {index < list.length - 1 && (
                <div className="flex items-center mx-2">
                  <div className="w-8 h-1 bg-gray-400 relative">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[12px] border-l-gray-400 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1"></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
          {list.length === 0 && (
            <div className="flex flex-col items-center mx-auto text-gray-500 text-xl w-full">
              <span className="text-sm font-bold text-green-500">HEAD</span>
              <div className="w-16 h-8 text-center leading-8 bg-green-500 rounded-lg shadow-lg mt-2"></div>
              <div className="mt-4">List is Empty</div>
            </div>
          )}
          {list.length > 0 && (
            <div className="flex flex-col items-center ml-6">
              <span className="md:text-sm text-[10px] font-bold text-red-500">TAIL</span>
              <div className="w-16 h-8 text-center leading-8 bg-red-500 rounded-lg shadow-lg mt-2"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglyLinkedListVisualizer;
