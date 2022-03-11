// import axios from 'axios'

// Adding the Github url and token
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL 
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN 

 

// Get search results
export const searchUsers = async (text) => {

    // Creating params vairable
    const params = new URLSearchParams({
        q: text
    })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`,
    // To include Token, we do that in the authorization header by passing a second argument into fetch
        // {
        //     headers: {
        //         Authorization: `token ${GITHUB_TOKEN}`
        //     }
        // }
    )

    const {items} = await response.json()
    console.log(items)

    return items
}

// Get single user
export const getUser = async (login) => {

    const response = await fetch(`${GITHUB_URL}/users/${login}`,
    // To include Token, we do that in the authorization header by passing a second argument into fetch
        // {
        //     headers: {
        //         Authorization: `token ${GITHUB_TOKEN}`
        //     }
        // }
    )

    // If status response returns an error, if the search doesn't match anything
    if(response.status === 404) {
        window.location = '/notfound'
    }else {
        const data = await response.json()

        return data
    }
}

// Get User Repos
export const getUserRepos = async (login) => {

    // Creating params vairable
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,
    // To include Token, we do that in the authorization header by passing a second argument into fetch
        // {
        //     headers: {
        //         Authorization: `token ${GITHUB_TOKEN}`
        //     }
        // }
    )

    const data = await response.json()

    return data
    }