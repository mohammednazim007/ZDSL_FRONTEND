// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import useFacebookLogin from "./useFacebookLogin";
// import toast from "react-hot-toast";

// const useEnsureFacebookUser = () => {
//   const [isLoginClicked, setLoginClicked ] = useState(false);
//   const { user, fbLogin, statusMessage } = useFacebookLogin();
//   const router = useRouter();

//   const handleFbLogin = () => { 
//     setLoginClicked(true)
//    }

//   // const fetchUserFromBackend = async (fbUser: { accessToken: any; }) => {
//   //   try {
//   //     const response = await axios.get(
//   //       `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login/social`,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${fbUser?.accessToken}`, // Add the access token in the Authorization header
//   //         },
//   //         params: {
//   //           social: 'facebook',
//   //         },
//   //       }
//   //     );

//   //     const { acknowledgement, message, description, isNew, user, accessToken } = response.data;

//   //     // Set cookie and dispatch actions if the response is successful
//   //     if (acknowledgement) {
//   //       setLoginClicked(false);

//   //       router.push(user.curActivePage || "/social");
//   //     }

//   //   } catch (error) {
//   //     // Handle network or unexpected errors
//   //     console.log("Error fetching user info from backend:", error);

//   //     if (error.response && error.response.data) {
//   //       const { message, description } = error.response.data;
//   //       toast.error(description || message || "An error occurred!");
//   //     } else {
//   //       toast.error("Network error. Please check your connection and try again.");
//   //     }
//   //   }
//   // };  

//   useEffect(() => {
//     if ( user && isLoginClicked) {
//       // fetchUserFromBackend(user);
//       console.log({user, isLoginClicked})
//     } else if ( !user && isLoginClicked) {
//       fbLogin();
//     }
//   }, [user]);

//   return {
//     user:  user,
//     statusMessage,
//     fbLogin,
//     handleFbLogin
//   };
// };

// export default useEnsureFacebookUser;



import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useFacebookLogin from "./useFacebookLogin";
import toast from "react-hot-toast";
import { setCookie } from "@/libs/tokenUtils";
import { useDispatch } from "react-redux";
import { setUser } from '@/libs/redux/features/auth/authSlice'
import { jwtDecode } from 'jwt-decode'


const useEnsureFacebookUser = () => {
  const [isLoginClicked, setLoginClicked] = useState(false);
  const { user, fbLogin, statusMessage } = useFacebookLogin();
  const router = useRouter();
  const dispatch = useDispatch()

  const handleFbLogin = () => {
    setLoginClicked(true);
  };

  const getFacebookUserData = async (fbAccessToken: any) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${fbAccessToken}&fields=name,email,picture`
      );
      const fbData = await response.json();

      // Extracting the necessary fields
      const { email, name, picture, id: facebookId } = fbData;
      const profileImage = picture?.data?.url; // This is the profile image URL

      return { email, name, facebookId, profileImage }; // Return the necessary data
    } catch (error) {
      console.error("Error fetching Facebook user data:", error);
      throw new Error("Failed to fetch Facebook user data");
    }
  };


  // Function to call the Facebook login mutation
  const callFacebookLoginMutation = async (fbUser: any) => {
    const mutation = `
      mutation FacebookLogin($email: String!, $userId: ID, $profilePic: String) {
  facebookLogin(email: $email, userId: $userId, profilePic: $profilePic) {
    success
    message
    accessToken
}
}
    `;

    console.log({ fbUser })
    const token = fbUser.accessToken;

    const fbUserFrom = await getFacebookUserData(token);
    console.log({ fbUserFrom })
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            email: fbUserFrom.email,
            userId: fbUserFrom.facebookId,
            profilePic: fbUserFrom.profileImage,
          },
        }),
      });

      const result = await response.json();
      console.log("Facebook Login Mutation Result:", result); // Debugging log

      const accessToken = result?.data?.facebookLogin?.accessToken || {};

      if (accessToken) {
        const userDecode: any = jwtDecode(accessToken)
        const id = userDecode?.userID
        const user = { id, role: userDecode?.role }

        setCookie('zdsl_accessToken', accessToken)
        setCookie('zdsl_user', JSON.stringify(user))
        dispatch(setUser({ user, token: accessToken }))

        toast.success('Login successful!')
        router.push('/')
      } else toast.error(result?.data?.facebookLogin?.message || 'Login failed')
    } catch (error) {
      console.error("Error during Facebook login mutation:", error);
      toast.error("An unexpected error occurred during Facebook login.");
    }
  };

  useEffect(() => {
    if (user && isLoginClicked) {
      // If user data is available and login was clicked, call the mutation
      callFacebookLoginMutation(user);
      console.log({ user })
    } else if (!user && isLoginClicked) {
      // If no user is available, trigger Facebook login
      fbLogin();
    }
  }, [user, isLoginClicked]);

  return {
    user,
    statusMessage,
    fbLogin,
    handleFbLogin,
  };
};

export default useEnsureFacebookUser;
