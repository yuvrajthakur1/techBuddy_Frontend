import React, { useState, useEffect, useRef } from 'react';
import api from '../axios/axios'
import SidebarItem from '../components/SideBarComponent';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { MenuIcon } from 'lucide-react';



const PracticeChat = () => {
  const [question, setQuestion] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [isSideBarOpen,setSideBarOpen] = useState(false);

  //Jese Hi user select karega QuestionFetchLoader call hoga data nikal ayega
  const randomQuestion = useLoaderData();
  const  {isMobileMenuOpen} = useOutletContext();
 

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to fetch a new question from the backend

  // Function to handle user's answer submission
  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!userAnswer.trim() || loading) return;

    // Add user's message to chat history
    const newUserMessage = { sender: 'User', message: userAnswer };
    setChatHistory(prev => [...prev, newUserMessage]);
    setUserAnswer('');
    setLoading(true);

    try {
      // Send the user's answer to the backend for assessment
      const response = await api.post('/practice/assess-answer', {
        question: question,
        userAnswer: newUserMessage.message
      });

      const aiResponse = { sender: 'techBuddy', message: `Feedback: ${response.data.feedback}\nScore: ${response.data.score}/100` };
      setChatHistory(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Failed to assess answer:', error);
      const errorMessage = error.response ? `Error: ${error.response.data.msg}` : 'Failed to get feedback from AI. Please try again.';
      const errorResponse = { sender: 'techBuddy', message: errorMessage };
      setChatHistory(prev => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to bottom whenever chat history updates
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(()=>{
    setLoading(true);
    setChatHistory([]); // Clear chat for a new session
    setQuestion(null);
    try {
       setQuestion(randomQuestion);
      setChatHistory([{ sender: 'techBuddy', message: randomQuestion}]);
      
    } catch (error) {
      console.error('Failed to fetch question:', error);
      const errorMessage = error.response ? `Error: ${error.response.data.msg}` : 'Failed to connect to server. Please try again later.';
      setQuestion({ question: errorMessage });
    } finally {
      setLoading(false);
    } 

  },[randomQuestion])
   

  ////////////////////////
  
  return (
    <div className="flex h-full bg-gray-900">
      <style>{`
        .glass-card {
          background-color: rgba(31, 41, 55, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(75, 85, 99, 0.7);
        }
        .chat-message.user {
          background-color: #3b82f6;
          align-self: flex-end;
        }
        .chat-message.ai {
          background-color: #4b5563;
          align-self: flex-start;
        }
      `}</style>
      
    <MenuIcon/> 
     {isSideBarOpen &&
      <aside className='w-60 hidden p-2 md:flex md:flex-col gap-3 bg-gray-900 py-10 overflow-y-scroll'>
              <div className='flex flex-col'>
                 <SidebarItem title="DSA" options={["Array","Stack","Sorting","LinkedList","Queue","String","DSAQuestion"]} />
                 <SidebarItem title="Java" options={["Core","Advance","Java Collections"]}/>
                 <SidebarItem title="OOPS(java)" options={["Inheritance","Polymorphism","Encapsulation","Abstraction","Interface","General"]}/>
                 <SidebarItem title="HR"/>
              </div>
      </aside> 
     }

      <div className="flex flex-col justify-center p-10 items-center gap-3  overflow-y-auto flex-1  ">

       <div>
         <h1 className="md:text-3xl text-xl font-extrabold text-white text-center mb-4">Practice Interview</h1>
        <p className='text-justify text-gray-400 p-3'>Pick Topic From Side Baar  Then Random Question From That Topic Will Appear In Chat Box Then Type Your Answer Our Ai Agent Will Asses Your Answer and Give Feedback and Score Try Same Answering Question Till Ai Rate You Higher</p>
       </div>

        {/* Chat window */}
        <div className={` ${isMobileMenuOpen?"":"glass-card"} p-5 rounded-xl overflow-y-auto w-full shadow-xl  flex flex-col`}>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-gray-300">
            {chatHistory.length === 0 && !loading && (
              <div className="text-center text-gray-400 mt-20">
                <p className="md:text-lg text-md">Select a question type above to begin your practice session.</p>
              </div>
            )}
            
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                <div className={`chat-message p-3 rounded-lg max-w-lg shadow-md`}>
                  <p className="font-bold text-md mb-1">{msg.sender === 'User' ? 'You' : 'techBuddy'}</p>
                  <p className="whitespace-pre-wrap text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="chat-message ai p-3 rounded-lg shadow-md">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* User input form */}
          <form onSubmit={handleAnswerSubmit} className="mt-4 gap-3 justify-center items-center flex lg:flex-row flex-col space-x-4">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="flex-1 w-full px-3 py-1 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Type your answer here..."
              rows="2"
              disabled={loading || !question}
            />
            <button
              type="submit"
              className="bg-blue-500 w-[40vw] md:w-72 py-3 px-3 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
              disabled={loading || !question}
            >
              Submit
            </button>
          </form>
        </div>
        
      </div>
       

    </div>
  );
};

export default PracticeChat;
