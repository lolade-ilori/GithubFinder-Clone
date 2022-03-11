import { createContext, useReducer } from 'react'
import githubReducer from './GithubReeducer'

const GithubContext = createContext()


// We need to export a provider
export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    // Using the useReducer Hook
    const [state, dispatch] = useReducer(githubReducer, initialState)



  return <GithubContext.Provider value={{
      ...state,
      dispatch,
  }}>
      {children}
  </GithubContext.Provider> 
}

export default GithubContext
