import {React,useState} from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../FirebaseConfig';

export default function SignOut() {
  const [email, setEmail] = useState('');
  const [npassword, setnPassword] = useState('');
  const [cpassword, setcPassword] = useState('');
  const [name, setname] = useState('');
  const [contact, setcontact] = useState('');
  const [username, setusername] = useState('');
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  
  const verifyPassword = () => {
    
    if (npassword === cpassword) {
      createUserWithEmailAndPassword(email, npassword)
    } else {
      alert('Password does not match');
    }
  };
  

  if (error) {
    // return (
    //   <div>
    //     <p>Error: {error?.message}</p>
    //   </div>
    // );
    alert(error.message);
    error = null;
    window.location.reload();
  }
  if (loading) {
    return <p className='text-center'>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User: {user.email}</p>
      </div>
    );
  }
  return (
    <div className='SignUp'>
      <div className="min-h-screen ">
        <div className="flex md:justify-end">
          <div className="bg-white min-h-screen md:w-1/3 w-full flex justify-center items-center bg-opacity-90 text-black">
            <div>
              <div>
                <div>
                  <h1 className="text-2xl font-bold text-center">Create Account Here</h1>
                </div>
                <div className="flex flex-wrap -mx-auto my-3">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block text-md mb-2" for="name">
                      Name
                      </label>
                      <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" required id="name" type="text"value={name} onChange={(e) => setname(e.target.value)} placeholder="Enter Name" name="name"/>
                    </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-md mb-2" for="username">
                      Username
                    </label>
                    <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" required id="username" name="username"value={username} onChange={(e) => setusername(e.target.value)} type="text" placeholder="Enter Username"/>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-auto my-5">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-md mb-2" for="email">Email</label>
                    <input id="email" className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"/>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-md mb-2" for="contact">Contact</label>
                    <input id="contact" className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="text" name="contact" value={contact} onChange={(e) => setcontact(e.target.value)} placeholder="Enter Contact"/>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-auto my-5">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-md mb-2" for="npassword">New Password</label>
                    <input id="npassword" className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="npassword" value={npassword} onChange={(e) => setnPassword(e.target.value)} placeholder="New Password"/>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-md mb-2" for="cpassword">Confirm Password</label>
                    <input id="cpassword" className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="cpassword" value={cpassword} onChange={(e) => setcPassword(e.target.value)} placeholder="Confirm Password"/>
                  </div>
                </div>
                <div className="">
                  <button id="submit"className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100" onClick={(e) => verifyPassword(e)} >Sign Up</button>
                </div>
              </div>
              <p className="mt-8 text-center"> Already have an account? <a href="/" className="cursor-pointer text-sm text-blue-600"> Login Here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// function page(){
//   return(
//     <div className="SignUp">
//       <input
//       className='text-black'
//         type="email"
//         value={email}
//         placeholder='Enter your email'
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         className='text-black'
//         value={npassword}
//         placeholder='Enter your password'
//         onChange={(e) => setnPassword(e.target.value)}
//       />
//       <input
//         type="password"
//         className='text-black'
//         value={cpassword}
//         placeholder='Confirm your password'
//         onChange={(e) => setcPassword(e.target.value)}
//       />
//       <button onClick={(e) => verifyPassword(e)}>
//         Register
//       </button>     
//       <p>Already Have Account? <a href="/signIn"> Sign In</a></p>

//     </div>
//   )
// }

