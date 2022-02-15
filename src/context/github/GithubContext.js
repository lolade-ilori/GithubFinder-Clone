import { createContext, useReducer } from 'react'
import githubReducer from './GithubReeducer'

const GithubContext = createContext()

// Adding the Github url and token
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL 
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN 

// We need to export a provider
export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        loading: false
    }

    // Using the useReducer Hook
    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Get search results
  const searchUsers = async (text) => {
    setLoading()

    // Creating params vairable
    const params = new URLSearchParams({
        q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`,
    // To include Token, we do that in the authorization header by passing a second argument into fetch
        {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        }
    )

    const {items} = await response.json()

    dispatch({
        type: 'GET_USERS',
        payload: items
    })
}

    // Get single user
    const getUser = async (login) => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}`,
    // To include Token, we do that in the authorization header by passing a second argument into fetch
        {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        }
    )

    // If status response returns an error, if the search doesn't match anything
    if(response.status === 404) {
        window.location = '/notfound'
    }else {
        const data = await response.json()

        dispatch({
            type: 'GET_USER',
            payload: data
        })
    }
}

//   Set Loading
  const setLoading = () => dispatch({
      type: 'SET_LOADING'
  })

//   Clear Users
  const clearUsersFunction = () => {
      dispatch({
          type: 'CLEAR_USERS',
          payload: [],
      })
  }


  return <GithubContext.Provider value={{
      users: state.users,
      user: state.user,
      loading: state.loading,
      searchUsers,
      clearUsersFunction,
      getUser
  }}>
      {children}
  </GithubContext.Provider> 
}

export default GithubContext
