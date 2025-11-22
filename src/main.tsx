import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from '../testing/Test.tsx'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
// import { persistor, store } from './store/store.ts'
// import { PersistGate } from 'redux-persist/integration/react'


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <PersistGate persistor={store}> */}
     <Provider store={store}>
         <App/>
      </Provider>
      {/* </PersistGate> */}

     
      
   
  </React.StrictMode>,
)
