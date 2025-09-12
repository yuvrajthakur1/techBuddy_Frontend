import React, { useState, useRef, useEffect } from 'react';

// A simple delay function to create pauses for animation
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// A function to generate a random 6-digit hex address for visualization
const generateAddress = () => '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();

// The main component for the visualizer
const SinglyCircularLinkedListVisualizer = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [explanation, setExplanation] = useState('');

  const headRef = useRef(null);
  const tailRef = useRef(null);
  const [connectorCoords, setConnectorCoords] = useState(null);

  useEffect(() => {
    const updateConnector = () => {
      if (list.length > 0 && headRef.current && tailRef.current) {
        const headRect = headRef.current.getBoundingClientRect();
        const tailRect = tailRef.current.getBoundingClientRect();

        const container = document.querySelector('.visualization-container');
        const containerRect = container.getBoundingClientRect();
        
        const startX = tailRect.right - containerRect.left - 50;
        const startY = tailRect.bottom - containerRect.top + 10;
        
        const endX = headRect.left - containerRect.left + headRect.width / 2;
        const endY = headRect.bottom - containerRect.top + 10;
        
        setConnectorCoords({ startX, startY, endX, endY });
      } else {
        setConnectorCoords(null);
      }
    };
    
    updateConnector();
    window.addEventListener('resize', updateConnector);
    return () => window.removeEventListener('resize', updateConnector);
  }, [list]);


  // A function to create a new node object
  const createNode = (value) => ({
    value,
    address: generateAddress(),
    key: Date.now() + Math.random(),
  });

  // Handles adding an element to the end of the list (Append)
  const handleAppend = async () => {
    if (inputValue.trim() === '') {
      setErrorMessage('Please enter a value to append.');
      return;
    }
    
    setErrorMessage('');
    setIsAnimating(true);
    setExplanation('Step 1: Creating a new node to append to the list.');
    const newNode = createNode(inputValue);
    
    // Simulate pointer updates and animation
    const newVisualList = [...list];
    if (newVisualList.length > 0) {
      setExplanation('Step 2: Updating the last node\'s pointer to the new node.');
      newVisualList.push({ ...newNode, isAdding: true });
    } else {
      setExplanation('Step 2: The new node is both the HEAD and TAIL of the list.');
      newVisualList.push({ ...newNode, isAdding: true });
    }
    
    setList(newVisualList);
    await delay(500);

    const finalNewList = newVisualList.map(node => ({ ...node, isAdding: false }));
    setList(finalNewList);
    setInputValue('');
    setExplanation('The node has been successfully appended to the end of the list.');
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
    setExplanation('Step 1: Creating a new node to prepend to the list.');
    const newNode = createNode(inputValue);
    
    setExplanation('Step 2: The new node\'s next pointer now points to the current HEAD.');
    const newVisualList = [{ ...newNode, isAdding: true }, ...list];
    setList(newVisualList);
    
    await delay(500);
    const finalNewList = newVisualList.map(node => ({ ...node, isAdding: false }));
    setExplanation('Step 3: The HEAD pointer is updated to point to the new node, and the TAIL now points to it as well.');
    setList(finalNewList);
    
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
    setExplanation(`Step 1: Traversing the list to find the position before index ${index}.`);
    
    // Animate the traversal
    for (let i = 0; i < index; i++) {
        setList(list.map((node, idx) => ({ ...node, isTraversing: idx === i })));
        await delay(500);
    }
    setList(list.map(node => ({ ...node, isTraversing: false })));
    
    setExplanation(`Step 2: Creating a new node with value "${inputValue}".`);
    const newNode = createNode(inputValue);
    
    const newVisualList = [...list];
    newVisualList.splice(index, 0, { ...newNode, isAdding: true });
    setList(newVisualList);
    
    await delay(500);
    setExplanation(`Step 3: The previous node's next pointer is updated to the new node, and the new node's next pointer is updated to the next node.`);
    const finalNewList = newVisualList.map(node => ({ ...node, isAdding: false }));
    setList(finalNewList);
    
    setInputValue('');
    setInputIndex('');
    setIsAnimating(false);
    setExplanation('The node has been successfully inserted.');
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
    const newVisualList = [...list];
    newVisualList[index].isDeleting = true;
    setList(newVisualList);
    
    await delay(500);
    newVisualList.splice(index, 1);
    setList(newVisualList);
    
    setInputIndex('');
    setIsAnimating(false);
  };

  const handleClear = () => {
    setList([]);
    setErrorMessage('');
    setInputValue('');
    setInputIndex('');
    setIsAnimating(false);
    setExplanation('');
  };

  return (
    <div className="min-h-screen  bg-gray-950 text-gray-100 flex flex-col items-center p-8">
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-extrabold text-white text-center mb-6">Singly Circular Linked List Visualizer</h1>
      <p className="lg:text-lg md:text-md text-base text-gray-400 text-center mb-8">
        A Singly Circular Linked List has a pointer from the last node back to the first.
      </p>

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-8xl mb-8">
        <h2 className="lg:text-2xl md:text-xl text-lg font-bold text-white mb-2">Operations</h2>
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

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-8xl">
        {errorMessage && (
          <div className="text-red-400 text-center mb-4">{errorMessage}</div>
        )}

        {explanation && (
          <div className="text-green-400 text-center text-lg font-semibold mb-4">{explanation}</div>
        )}

        <div className="visualization-container mt-8 flex items-center justify-start overflow-x-auto p-4 border border-gray-700 rounded-lg relative min-h-[24rem]">
          {list.length > 0 && (
            <div className="flex flex-col items-center mr-6" ref={headRef}>
              <span className="text-sm font-bold text-green-500">HEAD</span>
              <div className="text-xs text-gray-300"><span className="font-mono">{list[0].address}</span></div>
              <div className="w-16 h-8 text-center leading-8 bg-green-500 rounded-lg shadow-lg mt-2"></div>
            </div>
          )}
          
          {list.map((node, index) => (
            <React.Fragment key={node.key}>
              <div className="relative flex flex-col items-center">
                <span className="absolute -top-6 text-sm font-bold text-gray-400">{index}</span>
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-blue-600 relative
                  transform transition-all duration-500 ease-in-out ${node.isAdding ? 'opacity-0 translate-y-10' : ''} ${node.isDeleting ? 'opacity-0 scale-50 -translate-y-10' : ''} ${node.isTraversing ? 'ring-4 ring-yellow-400' : ''}`}
                  ref={index === list.length - 1 ? tailRef : null}
                >
                  <div className="text-sm text-gray-200 mb-1">Data: <span className="font-bold text-white">{node.value}</span></div>
                  <div className="text-xs text-gray-300">Address: <span className="font-mono">{node.address}</span></div>
                  <div className="text-sm text-gray-200 mt-2">Next: <span className="font-bold text-white">{index < list.length - 1 ? list[index + 1].address : (list.length > 0 ? list[0].address : 'Null')}</span></div>
                </div>
              </div>
              {index < list.length - 1 && (
                <div className="flex items-center mx-2">
                  <div className="relative w-12 h-1 bg-gray-400">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[12px] border-l-gray-400 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1"></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}

          {list.length > 0 && (
            <div className="flex flex-col items-center ml-6">
              <span className="text-sm font-bold text-red-500">TAIL</span>
              <div className="text-xs text-gray-300"><span className="font-mono">{list[list.length - 1].address}</span></div>
              <div className="w-16 h-8 text-center leading-8 bg-red-500 rounded-lg shadow-lg mt-2"></div>
            </div>
          )}
          

          {list.length === 0 && (
            <div className="flex flex-col items-center mx-auto text-gray-500 text-xl w-full">
              <span className="text-sm font-bold text-green-500">HEAD</span>
              <div className="w-16 h-8 text-center leading-8 bg-green-500 rounded-lg shadow-lg mt-2"></div>
              <div className="mt-4">List is Empty</div>
            </div>
          )}
          
          {list.length > 0 && connectorCoords && (
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                </marker>
              </defs>
              <path
                d={`M${connectorCoords.startX},${connectorCoords.startY} C${connectorCoords.startX},${connectorCoords.startY + 50} ${connectorCoords.endX},${connectorCoords.endY + 50} ${connectorCoords.endX},${connectorCoords.endY}`}
                fill="transparent"
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="5"
                markerEnd="url(#arrowhead)"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglyCircularLinkedListVisualizer;
