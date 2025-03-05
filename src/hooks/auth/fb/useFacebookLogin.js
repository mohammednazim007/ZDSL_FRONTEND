/* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const useFacebookLogin = () => {
//   const [user, setUser] = useState(null);
//   const [statusMessage, setStatusMessage] = useState(
//     "Please log in to use this feature."
//   );
//   const router = useRouter(); // Initialize the router for redirection
//   // Load Facebook SDK
//   useEffect(() => {
//     const loadFacebookSDK = () => {
//       if (document.getElementById("facebook-jssdk")) return;

//       const script = document.createElement("script");
//       script.id = "facebook-jssdk";
//       script.src = "https://connect.facebook.net/en_US/sdk.js";
//       script.onload = initializeFacebookSDK;
//       document.body.appendChild(script);
//     };

//     const initializeFacebookSDK = () => {
//       window.FB.init({
//         appId: "496076950144317",
//         cookie: true,
//         xfbml: true,
//         version: "v20.0",
//       });

//       // Check login status on SDK load
//       if (window.location.protocol === "https:") {
//         window.FB.getLoginStatus(handleStatusChange);
//       } else {
//         console.warn(
//           "Facebook login requires HTTPS. Please use HTTPS for this feature."
//         );
//       }
//     };

//     loadFacebookSDK();
//   }, []);

//   // Handle login status response
//   const handleStatusChange = (response) => {
//     // console.log({response}, "respons from handler")
//     if (response.status === "connected") {
//         fetchUserProfile(response);
//     } else {
//       setStatusMessage("Please log in to use this feature.");
//       setUser(null); // Ensure user is set to null if not connected
//     }
//   };

//   // Handle Facebook login
//   const fbLogin = () => {
//     // setIsLoginClicked(true); // Mark that login was initiated by the user
//     window.FB.login(handleStatusChange, { scope: "public_profile,email" });
//   };

//   // Fetch user profile information, including the profile picture
//   const fetchUserProfile = (data) => {
//     setUser(data?.authResponse); // Update local user state for reference
//     setStatusMessage(data.status);
//   };

//   const fbLogout = () => {
//     window.FB.logout(() => {

//       // Reset local user state
//       setUser(null);

//       // Redirect the user to the login page or home page
//       router.push("/");

//       toast.success("Logged out successfully.");
//     });
//   };

//   return { user, fbLogin, fbLogout, statusMessage };
// };

// export default useFacebookLogin;
'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

// Define types for the Facebook SDK and responses
// interface FacebookAuthResponse {
//   accessToken: string;
//   expiresIn: string;
//   signedRequest: string;
//   userID: string;
// }

// interface FacebookLoginResponse {
//   status: string;
//   authResponse?: FacebookAuthResponse;
// }

// declare global {
//   interface Window {
//     FB: {
//       init: (options: {
//         appId: string;
//         cookie: boolean;
//         xfbml: boolean;
//         version: string;
//       }) => void;
//       getLoginStatus: (callback: (response: FacebookLoginResponse) => void) => void;
//       login: (
//         callback: (response: FacebookLoginResponse) => void,
//         options?: { scope: string }
//       ) => void;
//       logout: (callback: () => void) => void;
//     };
//   }
// }

const useFacebookLogin = () => {
  const [user, setUser] = useState(null)
  const [statusMessage, setStatusMessage] = useState(
    'Please log in to use this feature.'
  )
  const router = useRouter() // Initialize the router for redirection

  // Load Facebook SDK
  useEffect(() => {
    const loadFacebookSDK = () => {
      if (document.getElementById('facebook-jssdk')) return

      const script = document.createElement('script')
      script.id = 'facebook-jssdk'
      script.src = 'https://connect.facebook.net/en_US/sdk.js'
      script.onload = initializeFacebookSDK
      document.body.appendChild(script)
    }

    const initializeFacebookSDK = () => {
      if (typeof window !== 'undefined' && window.FB) {
        window.FB.init({
          appId: '496076950144317',
          cookie: true,
          xfbml: true,
          version: 'v20.0',
        })

        // Check login status on SDK load
        if (window.location.protocol === 'https:') {
          window.FB.getLoginStatus(handleStatusChange)
        } else {
          console.warn(
            'Facebook login requires HTTPS. Please use HTTPS for this feature.'
          )
        }
      }
    }

    loadFacebookSDK()
  }, [])

  // Handle login status response
  const handleStatusChange = (response) => {
    if (response.status === 'connected' && response.authResponse) {
      fetchUserProfile(response.authResponse)
    } else {
      setStatusMessage('Please log in to use this feature.')
      setUser(null) // Ensure user is set to null if not connected
    }
  }

  // Handle Facebook login
  const fbLogin = () => {
    if (typeof window !== 'undefined' && window.FB) {
      window.FB.login(handleStatusChange, { scope: 'public_profile,email' })
    }
  }

  // Fetch user profile information, including the profile picture
  const fetchUserProfile = (authResponse) => {
    setUser(authResponse) // Update local user state for reference
    setStatusMessage('Logged in successfully.')
  }

  const fbLogout = () => {
    if (typeof window !== 'undefined' && window.FB) {
      window.FB.logout(() => {
        // Reset local user state
        setUser(null)

        // Redirect the user to the login page or home page
        router.push('/')

        toast.success('Logged out successfully.')
      })
    }
  }

  return { user, fbLogin, fbLogout, statusMessage }
}

export default useFacebookLogin
