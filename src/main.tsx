import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { persistor, store } from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Provider store={store}>
    {/* wrap the app with PersistGate */}
    <PersistGate loading={null} persistor={persistor}>  
    <App />
    </PersistGate>
    </Provider>
  </StrictMode>,
)

