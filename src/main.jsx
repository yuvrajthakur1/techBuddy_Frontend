import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import signupAction from './actions/signupAction.js'
import loginAction from './actions/LoginAction.js'
import ProfilePage from './pages/profilePage.jsx'
import profileLoader from './loader/profileLoader.js'
import PracticeChat from './pages/PracticeChat.jsx'
import AppLayout from './layouts/AppLayout.jsx'
import AboutPage from './pages/About.jsx'
import ProfileNavbar from './layouts/ProfileNav.jsx'
import questionFetchLoader from './loader/QuestionFetchLoader.js'
import Array from './pages/DSAVisulaizerPages/Array.jsx'
import DSAVisualiserLayout from './layouts/DSAVisualiserLayout.jsx'
import ArrayVisualizer from './pages/DSAVisulaizerPages/Array.jsx'
import StackVisualizer from './pages/DSAVisulaizerPages/Stack.jsx'
import QueueVisualizer from './pages/DSAVisulaizerPages/Queue/SimpleQueue.jsx'
import SinglyLinkedListVisualizer from './pages/DSAVisulaizerPages/LinkedList/SinglyLinkedList.jsx'
import DoublyLinkedListVisualizer from './pages/DSAVisulaizerPages/LinkedList/DoublyLinkedList.jsx'
import SinglyCircularLinkedListVisualizer from './pages/DSAVisulaizerPages/LinkedList/SinglyCircular.jsx'
import DoublyCircularLinkedListVisualizer from './pages/DSAVisulaizerPages/LinkedList/DoublyCircular.jsx'
import CircularQueueVisualizer from './pages/DSAVisulaizerPages/Queue/CircularQueue.jsx'
import PriorityQueueVisualizer from './pages/DSAVisulaizerPages/Queue/PriorityQueue.jsx'
import DequeVisualizer from './pages/DSAVisulaizerPages/Queue/Deque.jsx'

const router = createBrowserRouter([

  // Open Public Routes
    {
      path:'/',
      element:<AppLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/about',
          element:<AboutPage/>
        }
      ]
    },
    {
      path:"/signup",
      element:<SignUp/>,
      action:signupAction
    },
    {
      path:"/login",
      element:<Login/>,
      action:loginAction
    },


    // Protected route prifle and practice page
    { 
      path:"/profile",
      element:<ProfileNavbar/>,
      loader:profileLoader,
      children:[
         {
      path:"/profile",
      element:<ProfilePage/>,
      loader:profileLoader
      },
      {
        path:"/profile/practice",
        element:<PracticeChat/>,
        loader:questionFetchLoader
      },
      ]
    },

    //Routes For Visualisation DSA

     {
      path:"/dsavisualiser",
      element:<DSAVisualiserLayout/>,
      loader:profileLoader,
      children:[
        {
        path:'/dsavisualiser/array/simple',
        element:<ArrayVisualizer/>
        },
        {
        path:'/dsavisualiser/stack/simple',
        element:<StackVisualizer/>
        },


        // All Queue Visualiser
        {
        path:'/dsavisualiser/queue',
        children:[
          {
            path:'/dsavisualiser/queue/simple',
            element:<QueueVisualizer/>
          },
          {
            path:'/dsavisualiser/queue/circular',
            element:<CircularQueueVisualizer/>
          },
          {
            path:'/dsavisualiser/queue/priority',
            element:<PriorityQueueVisualizer/>
          },
          {
            path:'/dsavisualiser/queue/deque',
            element:<DequeVisualizer/>
          }
        ]
        },
  

        //All Linked List Routes
        {
        path:'/dsavisualiser/linkedlist',
        children:[
          {
            path:'/dsavisualiser/linkedlist/singly',
            element:<SinglyLinkedListVisualizer/>
          },
          {
            path:'/dsavisualiser/linkedlist/doubly',
            element:<DoublyLinkedListVisualizer/>
          },
          {
            path:'/dsavisualiser/linkedlist/singlycircular',
            element:<SinglyCircularLinkedListVisualizer/>
          },
          {
            path:'/dsavisualiser/linkedlist/doublycircular',
            element:<DoublyCircularLinkedListVisualizer/>
          },
        ]
        },
      ]
     }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
