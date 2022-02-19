import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import AddAttendance from './components/Main/Attendance/AddAttendance';

function Auth(){
  return (
    <div className="Auth">
      <Router>
       <Routes>
          <Route exact path="/" element={
            <>
              <a href="/signIn" className='md:ml-auto flex flex-wrap items-center text-base justify-end'>
                <button 
                  className="m-2  text-white bg-blue-500 border-2 border-blue-900 p-1 focus:outline-none hover:bg-blue-600 rounded"
                >
                  SignIn / SignUp
                </button>
              </a>
              <AddAttendance/>

            </>
          }/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/signIn" element={<SignIn/>}/>
          {/* <Route path="/attendance/mark" element={<AddAttendance/>}/> */}
        </Routes>
      </Router>
    </div>
  )
}

// function Auth() {
//   const [email, setEmail] = useState('');
//   const [npassword, setnPassword] = useState('');
//   const [cpassword, setcPassword] = useState('');
//   const [
//     createUserWithEmailAndPassword,
//     ruser,
//     rloading,
//     rerror,
//   ] = useCreateUserWithEmailAndPassword(auth);
//   const [
//     signInWithEmailAndPassword,
//     user,
//     loading,
//     error,
//   ] = useSignInWithEmailAndPassword(auth);
//   const verifyPassword = () => {
    
//     if (npassword === cpassword) {
//       createUserWithEmailAndPassword(email, npassword)
//     } else {
//       alert('Password does not match');
//     }
//   };
  

//   if (error||rerror) {
//     return (
//       <div>
//         <p>Error: {error?.message+rerror?.message}</p>
//       </div>
//     );
//   }
//   if (loading||rloading) {
//     return <p>Loading...</p>;
//   }
//   if (user||ruser) {
//     return (
//       <div>
//         <p>Signed In User: {user.email+ruser.email}</p>
//       </div>
//     );
//   }
//   return (
//     <div className="SignIn">
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
//       <button onClick={() => signInWithEmailAndPassword(auth,email, npassword)}>
//         Sign In
//       </button>
//       <button onClick={(e) => verifyPassword(e)}>
//         Register
//       </button>     
      

//     </div>
//   );
// };





export default Auth;

