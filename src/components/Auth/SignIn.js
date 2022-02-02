import {React,useState} from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../FirebaseConfig';



export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  let [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  

  if (error) {
    alert(error.message);
    error = null;
    window.location.reload();
  }
  if (loading) {
    return <p className='text-center flex align-items-center justify-content-center'>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.email}</p>
      </div>
    );
  }
  return (
    
    <div className='SignIn'>
    <div className="min-h-screen ">
      <div className="flex md:justify-end">
        <div className="bg-white min-h-screen md:w-1/3 w-full flex justify-center items-center bg-opacity-90 text-black">
          <div>
            <div>
              <div>
                <span className="text-sm text-gray-900">Welcome back</span>
                <h1 className="text-2xl font-bold text-center">Login to your account</h1>
              </div>
              <div className="my-5">
                <label className="block text-md mb-2" htmlFor="email">Email</label>
                <input id="email" className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required/>
              </div>
              <div className="mt-5">
                <label className="block text-md mb-2" htmlFor="password">Password</label>
                <input id="password" className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required/>
              </div>
              <div className="">
                <button id="submit" className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100" onClick={() => signInWithEmailAndPassword(email,password)}>Login now</button>
              </div>
            </div>
            <p className="mt-8 text-center"> Dont have an account? <a id= "signup"href="/signUp" className="cursor-pointer text-sm text-blue-600"> Join free today</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

// function page(){
//   return(
//     <div className="SignIn">
//       <input
//       className='text-black'
// type="email"
//         value={email}
//         placeholder='Enter your email'
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         className='text-black'
//         value={password}
//         placeholder='Enter your password'
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={() => signInWithEmailAndPassword(email,password)}>
//         Sign In
//       </button>   
//       <p>Don't Have Account? <a href="/signUp"> Sign Up Now</a></p>

//     </div>
//   )
// }


