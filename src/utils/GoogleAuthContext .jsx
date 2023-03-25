import React from 'react'
import { useGoogleLogin } from 'react-use-googlelogin'

const GoogleAuthContext = React.createContext()

export const GoogleAuthProvider = ({ children }) => {
  const googleAuth = useGoogleLogin({
    clientId: "996098826211-7e1u28lev92u7cjv50fhdsca3jcubik9.apps.googleusercontent.com",
    // clientId: "365062625571-oipgvhgr69fn34i2hahqdk1483hdqllg.apps.googleusercontent.com", // Your clientID from Google.
    redirectUri: "http://localhost:3000/login",
    scope: "profile",
    uxMode: 'redirect',
  })
  

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuth = () => React.useContext(GoogleAuthContext)
