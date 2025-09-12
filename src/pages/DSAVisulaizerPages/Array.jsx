import React, { useState } from 'react';

const ArrayVisualizer = () => {
  const [arrayData, setArrayData] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [dataType, setDataType] = useState('Number');
  const [elementInput, setElementInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteStartIndex, setDeleteStartIndex] = useState('');
  const [deleteEndIndex, setDeleteEndIndex] = useState('');
  const [deleteSingleIndex, setDeleteSingleIndex] = useState('');
  const [insertIndex, setInsertIndex] = useState('');
  const [insertValue, setInsertValue] = useState('');
  const [replaceIndex, setReplaceIndex] = useState('');
  const [replaceValue, setReplaceValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [operationType, setOperationType] = useState('Insert');

  const animationDelay = 200; // milliseconds

  const delay = ms => new Promise(res => setTimeout(res, ms));

  // Handles updating the array size from the input field
  const handleSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    if (!isNaN(size) && size >= 0) {
      setArraySize(size);
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a valid non-negative number for the size.');
    }
  };

  // Handles updating the elements input field
  const handleElementInputChange = (e) => {
    setElementInput(e.target.value);
  };

  // Creates a new array based on size and element input, with nulls for empty slots
  const handleCreateArray = () => {
    setErrorMessage('');
    setIsAnimating(false);
    
    const inputElements = elementInput.split(',').map(item => item.trim());

    const newArray = new Array(arraySize).fill(null).map((val, index) => {
      if (index < inputElements.length) {
        let processedValue = inputElements[index];
        switch (dataType) {
          case 'Number': {
            const num = parseFloat(processedValue);
            return isNaN(num) ? null : num;
          }
          case 'Boolean':
            return processedValue.toLowerCase() === 'true';
          case 'String':
          default:
            return processedValue;
        }
      }
      return null;
    });

    setArrayData(newArray);
  };

  // Handles deleting a range of elements by shifting left
  const handleDeleteRange = async () => {
    const start = parseInt(deleteStartIndex, 10);
    const end = parseInt(deleteEndIndex, 10);
  
    if (isNaN(start) || isNaN(end) || start < 0 || end < start || start >= arraySize || end >= arraySize) {
      setErrorMessage('Invalid start or end index for deletion. Please enter a valid range within the array bounds.');
      return;
    }
    
    // Check if all elements in the range have values
    for (let i = start; i <= end; i++) {
        if (arrayData[i] === null) {
            setErrorMessage('Cannot delete range. One or more boxes in the selected range are empty.');
            return;
        }
    }
    
    setIsAnimating(true);
    const newArray = [...arrayData];
    const shiftDistance = end - start + 1;
    
    // Animate shifting elements left to fill the gap
    for (let i = start; i < arraySize - shiftDistance; i++) {
        newArray[i] = newArray[i + shiftDistance];
        setArrayData([...newArray]);
        await delay(animationDelay);
    }
    
    // Fill the remaining spots with null
    for (let i = arraySize - shiftDistance; i < arraySize; i++) {
        newArray[i] = null;
    }

    setArrayData(newArray);
    setErrorMessage('');
    setDeleteStartIndex('');
    setDeleteEndIndex('');
    setIsAnimating(false);
  };
  
  // Handles deleting a single element by shifting left
  const handleDeleteIndex = async () => {
    const indexToDelete = parseInt(deleteSingleIndex, 10);
  
    if (isNaN(indexToDelete) || indexToDelete < 0 || indexToDelete >= arraySize || arrayData[indexToDelete] === null) {
      setErrorMessage('Invalid index for deletion. The box at this index is empty.');
      return;
    }
    
    setIsAnimating(true);
    const newArray = [...arrayData];

    // Animate shifting elements left
    for (let i = indexToDelete; i < arraySize - 1; i++) {
        newArray[i] = newArray[i + 1];
        setArrayData([...newArray]);
        await delay(animationDelay);
    }

    // Fill the last spot with null
    newArray[arraySize - 1] = null;

    setArrayData(newArray);
    setErrorMessage('');
    setDeleteSingleIndex('');
    setIsAnimating(false);
  };

  // Handles inserting an element at a specific index by shifting right
  const handleInsertAtIndex = async () => {
    const indexToInsert = parseInt(insertIndex, 10);
    let valueToInsert = insertValue;

    if (isNaN(indexToInsert) || indexToInsert < 0 || indexToInsert >= arraySize) {
      setErrorMessage('Invalid index for insertion. Please enter a valid index (0 to ' + (arraySize - 1) + ').');
      return;
    }
    if (arrayData.every(val => val !== null)) {
      setErrorMessage('Array is full. Cannot insert more elements.');
      return;
    }

    switch (dataType) {
      case 'Number': {
        const num = parseFloat(valueToInsert);
        if (isNaN(num)) {
          setErrorMessage('Invalid value for number array. Please enter a number.');
          return;
        }
        valueToInsert = num;
        break;
      }
      case 'Boolean':
        valueToInsert = valueToInsert.toLowerCase() === 'true';
        break;
      case 'String':
      default:
        break;
    }

    setIsAnimating(true);
    const newArray = [...arrayData];

    // Animate shifting elements to the right to make space for the new element
    for (let i = arraySize - 1; i > indexToInsert; i--) {
        newArray[i] = newArray[i - 1];
        setArrayData([...newArray]);
        await delay(animationDelay);
    }

    newArray[indexToInsert] = valueToInsert;
    setArrayData(newArray);
    setErrorMessage('');
    setInsertIndex('');
    setInsertValue('');
    setIsAnimating(false);
  };

  // Handles replacing an element at a specific index
  const handleReplaceAtIndex = () => {
    const indexToReplace = parseInt(replaceIndex, 10);
    let valueToReplace = replaceValue;

    if (isNaN(indexToReplace) || indexToReplace < 0 || indexToReplace >= arraySize || arrayData[indexToReplace] === null) {
      setErrorMessage('Invalid index for replacement. The box at this index is empty or out of bounds.');
      return;
    }

    switch (dataType) {
      case 'Number': {
        const num = parseFloat(valueToReplace);
        if (isNaN(num)) {
          setErrorMessage('Invalid value for number array. Please enter a number.');
          return;
        }
        valueToReplace = num;
        break;
      }
      case 'Boolean':
        valueToReplace = valueToReplace.toLowerCase() === 'true';
        break;
      case 'String':
      default:
        break;
    }

    const newArray = [...arrayData];
    newArray[indexToReplace] = valueToReplace;
    setArrayData(newArray);
    setErrorMessage('');
    setReplaceIndex('');
    setReplaceValue('');
  };

  // Helper function to render values based on type
  const renderValue = (value) => {
    if (value === null) {
      return '';
    }
    if (typeof value === 'boolean') {
      return value ? 'True' : 'False';
    }
    if (value === '') {
      return '""';
    }
    return value;
  };

  const renderOperationControls = () => {
    switch (operationType) {
      case 'Insert':
        return (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="number"
              value={insertIndex}
              onChange={(e) => setInsertIndex(e.target.value)}
              placeholder="Index"
              className="w-full md:w-1/3 bg-gray-700 text-gray-200 py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              min="0"
              disabled={isAnimating}
            />
            <input
              type="text"
              value={insertValue}
              onChange={(e) => setInsertValue(e.target.value)}
              placeholder="Value"
              className="w-full md:w-1/3 bg-gray-700 text-gray-200 py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isAnimating}
            />
            <button
              onClick={handleInsertAtIndex}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              disabled={isAnimating}
            >
              Insert
            </button>
          </div>
        );
      case 'Replace':
        return (
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="number"
              value={replaceIndex}
              onChange={(e) => setReplaceIndex(e.target.value)}
              placeholder="Index"
              className="w-full md:w-1/3 bg-gray-700 text-gray-200 py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              min="0"
              disabled={isAnimating}
            />
            <input
              type="text"
              value={replaceValue}
              onChange={(e) => setReplaceValue(e.target.value)}
              placeholder="Value"
              className="w-full md:w-1/3 bg-gray-700 text-gray-200 py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              disabled={isAnimating}
            />
            <button
              onClick={handleReplaceAtIndex}
              className="w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              disabled={isAnimating}
            >
              Replace
            </button>
          </div>
        );
      case 'Delete':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <input
                type="number"
                value={deleteStartIndex}
                onChange={(e) => setDeleteStartIndex(e.target.value)}
                placeholder="Start Index"
                className="w-full text-sm md:w-1/3 bg-gray-700 text-gray-200 py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                min="0"
                disabled={isAnimating}
              />
              <input
                type="number"
                value={deleteEndIndex}
                onChange={(e) => setDeleteEndIndex(e.target.value)}
                placeholder="End Index"
                className="w-full text-sm md:w-1/3 bg-gray-700 text-gray-200 py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                min="0"
                disabled={isAnimating}
              />
              <button
                onClick={handleDeleteRange}
                className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-md py-1 px-6 rounded-lg shadow-lg transform transition-all text-[12px] duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                disabled={isAnimating}
              >
                Delete Range
              </button>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-2">
              <input
                type="number"
                value={deleteSingleIndex}
                onChange={(e) => setDeleteSingleIndex(e.target.value)}
                placeholder="Single Index"
                className="w-full md:w-2/3 bg-gray-700 text-gray-200 py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                min="0"
                disabled={isAnimating}
              />
              <button
                onClick={handleDeleteIndex}
                className="w-full md:w-auto bg-red-600  hover:bg-red-500 text-white py-1 px-6 rounded-lg shadow-lg transform transition-all font-md text-[12px] duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                disabled={isAnimating}
              >
                Delete at Index
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (

    <>

    <style>{`
        @keyframes pulse-light {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        .animate-pulse-light {
            animation: pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
        }
        .navbar-scrolled {
          background-color: rgba(31, 41, 55, 0.8);
          backdrop-filter: blur(16px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .nav-link-active {
          background-image: linear-gradient(to right, #3b82f6, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: bold;
        }
      `}{`
        @keyframes pulse-light {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
        }
        .animate-pulse-light {
            animation: pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
        }
        .navbar-scrolled {
          background-color: rgba(31, 41, 55, 0.8);
          backdrop-filter: blur(16px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .nav-link-active {
          background-image: linear-gradient(to right, #3b82f6, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          font-weight: bold;
        }
      `} {`
        .glass-card {
          background-color: rgba(31, 41, 55, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(75, 85, 99, 0.7);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInSlideUp {
          animation: fadeInSlideUp 1s ease-out forwards;
        }
        @keyframes glowing {
          0% { box-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6; }
          50% { box-shadow: 0 0 20px #3b82f6, 0 0 30px #3b82f6; }
          100% { box-shadow: 0 0 5px #3b82f6, 0 0 10px #3b82f6; }
        }
      `}</style>

    <div className="bg-gray-800  mx-auto my-7  flex flex-col  p-8 pb-10 rounded-xl   shadow-2xl w-full max-w-4xl">

        <h1 className="text-3xl font-extrabold text-white text-center mb-6">Array  Visualizer</h1>
        <p className="text-md text-gray-400 text-center mb-8">
          Create and manipulate an array to visualize its structure and operations. 
        </p>

        {/* Array Creation Controls */}
        <div className="flex flex-col gap-3 mb-7 p-3 border border-gray-700 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-2">Create Array</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-full md:w-auto">
              <select
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
                className="w-full bg-gray-700 text-gray-200 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                disabled={isAnimating}
              >
                <option value="Number">Number</option>
                <option value="String">String</option>
                <option value="Boolean">Boolean</option>
              </select>
            </div>
            <input
              type="number"
              value={arraySize}
              onChange={handleSizeChange}
              placeholder="Array size"
              className="w-full md:w-auto flex-grow bg-gray-700 text-gray-200 py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              min="0"
              disabled={isAnimating}
            />
            <input
              type="text"
              value={elementInput}
              onChange={handleElementInputChange}
              placeholder="Enter comma-separated elements"
              className="w-full md:w-auto flex-grow bg-gray-700 text-gray-200 py-3 px-4 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              disabled={isAnimating}
            />
            <button
              onClick={handleCreateArray}
              className="w-full font-medium md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              disabled={isAnimating}
            >
              Create Array
            </button>
          </div>
        </div>

        {/* Array Operations Controls - Compacted */}
        <div className="flex flex-col gap-4 p-4 border border-gray-700 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-white mb-2">Array Operations</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <select
              value={operationType}
              onChange={(e) => {
                setOperationType(e.target.value);
                setErrorMessage('');
              }}
              className="w-full bg-gray-700 text-gray-200 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              disabled={isAnimating}
            >
              <option value="Insert" className=' glass-card'>Insert</option>
              <option value="Replace"  className=' glass-card'>Replace</option>
              <option value="Delete"  className=' glass-card'>Delete</option>
            </select>
            {renderOperationControls()}
          </div>
        </div>
        
        {errorMessage && (
          <div className="text-red-400 text-center mb-4">{errorMessage}</div>
        )}

        {/* Array Visualization */}
        <div className="flex flex-col mb-20 items-center justify-center mt-8">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {arrayData.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-2 w-16 h-16 rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 text-md font-mono ${
                    item === null ? 'bg-gray-700 text-gray-500' : 'bg-blue-600 text-white'
                }`}
              >
                <div className='flex gap-1 justify-center items-center flex-col'>
                   <h6>{renderValue(item)}</h6>
                    <p>{index}</p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>

    </>
  );
};

export default ArrayVisualizer;
