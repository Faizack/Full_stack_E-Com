import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api";

const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const provider = new GoogleAuthProvider();
  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      // You can access user information from the result object
      console.log("User signed in:", user);
      const res = await login({
        _id: user.uid,
        email: user.email || "",
        name: user.displayName || "",
        photo: user.photoURL || "",
        role: "user",
        gender: gender,
        dob: date,
      });
      if ("data" in res) {
        toast.success("Login Success");
    } else {
        const err = res.error as  FetchBaseQueryError;
        const message = err.data as MessageResponse
        toast.error("Login Failed: " + message.message);
    }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("failed to signing");
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">login</h1>

        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>Date of birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <p>Already Signed In Once</p>
          <button onClick={loginHandler}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
