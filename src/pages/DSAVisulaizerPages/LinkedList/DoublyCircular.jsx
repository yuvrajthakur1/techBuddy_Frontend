import React, { useState, useRef, useEffect } from 'react';

// A simple delay function to create pauses for animation
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// A function to generate a random 6-digit hex address for visualization
const generateAddress = () => '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();

// The main component for the visualizer
const DoublyCircularLinkedListVisualizer = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [explanation, setExplanation] = useState('');
  const listContainerRef = useRef(null);
  const nodeRefs = useRef({});

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
      setExplanation('Step 2: Updating the last node\'s next pointer to the new node.');
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

  const getNodePos = (ref) => {
    if (ref.current && listContainerRef.current) {
      const { top, left, width, height } = ref.current.getBoundingClientRect();
      const containerRect = listContainerRef.current.getBoundingClientRect();
      return {
        x: left - containerRect.left + width / 2,
        y: top - containerRect.top + height / 2
      };
    }
    return { x: 0, y: 0 };
  };

  const headRef = useRef(null);
  const tailRef = useRef(null);

  useEffect(() => {
    nodeRefs.current = {};
  }, [list]);

  useEffect(() => {
    if (list.length > 1) {
      const headNode = nodeRefs.current[list[0].key];
      const tailNode = nodeRefs.current[list[list.length - 1].key];

      if (headNode && tailNode && listContainerRef.current) {
        const headPos = getNodePos({ current: headNode });
        const tailPos = getNodePos({ current: tailNode });
        const svgContainer = listContainerRef.current.querySelector('svg');

        if (svgContainer) {
          const nextPath = svgContainer.querySelector('#path-next');
          const prevPath = svgContainer.querySelector('#path-prev');

          const yOffset = 80;
          const tailToHeadY = tailPos.y + yOffset;
          const headToTailY = headPos.y - yOffset;
          
          const nextPathD = `M${tailPos.x},${tailPos.y + 35} C${tailPos.x},${tailToHeadY} ${headPos.x},${tailToHeadY} ${headPos.x},${headPos.y + 35}`;
          nextPath.setAttribute('d', nextPathD);

          const prevPathD = `M${headPos.x},${headPos.y - 35} C${headPos.x},${headToTailY} ${tailPos.x},${headToTailY} ${tailPos.x},${tailPos.y - 35}`;
          prevPath.setAttribute('d', prevPathD);
        }
      }
    }
  }, [list]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center p-8">
      <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl font-extrabold text-white text-center mb-6">Doubly Circular Linked List Visualizer</h1>
      <p className="lg:text-lg md:text-md text-base text-gray-400 text-center mb-8">
        Each node has pointers to both the next and previous nodes. The last node points to the first, and the first points to the last.
      </p>

      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-8xl mb-8">
        <h2 className="lg:text-2xl md:text-xl text-base font-bold text-white mb-2">Operations</h2>
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

        <div className="visualization-container mt-8 flex flex-col items-center justify-center p-4 min-h-[24rem] relative" ref={listContainerRef}>
          <div className="flex justify-start items-center w-full relative">
            {list.length > 0 && (
              <div className="flex flex-col items-center mr-6">
                <span className="text-sm font-bold text-green-500">HEAD</span>
                <div className="text-xs text-gray-300"><span className="font-mono">{list[0].address}</span></div>
                <div className="w-16 h-8 text-center leading-8 bg-green-500 rounded-lg shadow-lg mt-2" ref={headRef}></div>
              </div>
            )}
            
            <div className="flex items-start overflow-x-auto py-4">
              {list.map((node, index) => (
                <React.Fragment key={node.key}>
                  <div className="relative flex flex-col items-center mx-4">
                    <div
                      className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-blue-600 relative
                      transform transition-all duration-500 ease-in-out ${node.isAdding ? 'opacity-0 translate-y-10' : ''} ${node.isDeleting ? 'opacity-0 scale-50 -translate-y-10' : ''} ${node.isTraversing ? 'ring-4 ring-yellow-400' : ''}`}
                      ref={el => nodeRefs.current[node.key] = el}
                    >
                      <div className="text-sm text-gray-200 mb-1">Data: <span className="font-bold text-white">{node.value}</span></div>
                      <div className="text-xs text-gray-300">Address: <span className="font-mono">{node.address}</span></div>
                      <div className="text-sm text-gray-200 mt-2">Next: <span className="font-bold text-white">{index < list.length - 1 ? list[index + 1].address : (list.length > 0 ? list[0].address : 'Null')}</span></div>
                      <div className="text-sm text-gray-200 mt-1">Prev: <span className="font-bold text-white">{index > 0 ? list[index - 1].address : (list.length > 0 ? list[list.length - 1].address : 'Null')}</span></div>
                    </div>
                     <span className="mt-2 text-sm font-bold text-gray-400">{index}</span>
                  </div>
                  {index < list.length - 1 && (
                    <div className="flex items-center">
                      <div className="relative w-16 h-1 bg-gray-400">
                        {/* Next Arrow */}
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[12px] border-l-green-400 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1 z-20"></div>
                        {/* Prev Arrow */}
                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[12px] border-r-red-400 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1 z-20"></div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {list.length > 0 && (
              <div className="flex flex-col items-center ml-6">
                <span className="text-sm font-bold text-red-500">TAIL</span>
                <div className="text-xs text-gray-300"><span className="font-mono">{list[list.length - 1].address}</span></div>
                <div className="w-16 h-8 text-center leading-8 bg-red-500 rounded-lg shadow-lg mt-2" ref={tailRef}></div>
              </div>
            )}
          </div>

          {list.length > 1 && (
            <svg className="absolute w-full h-full left-0 top-0 pointer-events-none z-10 overflow-visible">
              <defs>
                <marker id="arrowhead-next" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#22C55E" />
                </marker>
                <marker id="arrowhead-prev" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto-start-reverse">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
                </marker>
              </defs>
              {/* Path for Tail -> Head (Next pointer) */}
              <path id="path-next" stroke="#22C55E" fill="none" strokeWidth="2" markerEnd="url(#arrowhead-next)"/>
              {/* Path for Head -> Tail (Prev pointer) */}
              <path id="path-prev" stroke="#EF4444" fill="none" strokeWidth="2" markerEnd="url(#arrowhead-prev)"/>
            </svg>
          )}

          {list.length === 0 && (
            <div className="flex flex-col items-center mx-auto text-gray-500 text-xl w-full">
              <div className="mt-4">List is Empty</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoublyCircularLinkedListVisualizer;
