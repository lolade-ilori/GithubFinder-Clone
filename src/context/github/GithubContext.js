import { createContext, useReducer } from 'react'
import { createRoutesFromChildren } from 'react-router-dom'
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
        repos: [],
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

    // Get User Repos
    const getUserRepos = async (login) => {
    setLoading()

    // Creating params vairable
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,
    // To include Token, we do that in the authorization header by passing a second argument into fetch
        {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        }
    )

    const data = await response.json()

    dispatch({
        type: 'GET_REPOS',
        payload: data
    })
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
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsersFunction,
      getUser,
      getUserRepos
  }}>
      {children}
  </GithubContext.Provider> 
}

export default GithubContext
