import { Link } from "react-router-dom";
import GenderCheckBox from "./GenderCheckBox";
import { useState } from "react";
import useSignUp from "../../hooks/useSignUp";

function SignUp() {

  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const { loading, signup } = useSignUp();

  const handleCheckboxChange = (gender: "male" | "female") => {
    setInputs({...inputs, gender})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(inputs);
  }

	return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp
          <span className="text-purple-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input 
              type="text"
              placeholder="John Doe"
              className="w-full input input-rounded h-10"
              value={inputs.fullName}
              onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input 
              type="text"
              placeholder="johndoe"
              className="w-full input input-rounded h-10"
              value={inputs.username}
              onChange={(e) => setInputs({...inputs, username: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input 
              type="password"
              placeholder="qwerty"
              className="w-full input input-rounded h-10"
              value={inputs.password}
              onChange={(e) => setInputs({...inputs, password: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input 
              type="password"
              placeholder="qwerty"
              className="w-full input input-rounded h-10"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
            />
          </div>

          <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <Link to="/login" className="text-sm hover:underline hover:text-purple-500 mt-2 inline-block">
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;