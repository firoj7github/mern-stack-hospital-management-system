import React from 'react'
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../src/firebase.init.js'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

 const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const navigate =useNavigate();
        if (error) {
          return (
            <div>
              <p>Error: {error.message}</p>
            </div>
          );
        }
       
        let signInError;
       
        
        
        if(error || gError){
        signInError = <p className='text-red-500'>{error?.message || gError?.message}</p>
        }
        // if(gUser || user){
        // navigate('/');
        // }

  const onSubmit = data =>{
    signInWithEmailAndPassword(data.email, data.password);
  };
  return (
    <div className='flex mt-24 mb-24 justify-center iteams-center'>
      <div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="text-center text-2xl font-bold">Login</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div class="form-control w-full max-w-xs">
     <label class="label">
         <span class="label-text text-lg">Email</span>
     </label>
     <input type="email" reset placeholder="Your Email" class="input input-bordered w-full max-w-xs"
      {...register("email", 
      {
        required: {
          value:true,
          message:'email is required'
        },
        pattern: {
          value: /[A-Za-z]{3}/,
          message: 'provide a valid email'
        }
      }
      )}
     />
    </div>
    
    
    <label class="label">
     {errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
     {errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
     </label>
    
    
    
    <div class="form-control w-full max-w-xs">
     <label class="label">
         <span class="label-text text-lg">Password</span>
     </label>
     <input type="password" placeholder="Your Password" class="input input-bordered w-full max-w-xs"
      {...register("password", 
      {
        required: {
          value:true,
          message:'password is required'
        },
        minLength: {
          value: 6,
          message: 'must be 6 character longer'
        }
      }
      )}
     />
    </div>
     
     
     <label class="label">
     {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
     {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
     </label>
      
     

     
     {signInError}
      
      <input className='btn w-full max-w-xs mt-3' value="Login" type="submit" />
    </form>
    <div className="divider">OR</div>
    <button onClick={() => signInWithGoogle()} className="btn btn-accent">Continue With Google</button>
  </div>
</div>
    </div>
    
  )
}

export default Login;