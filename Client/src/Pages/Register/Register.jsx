import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { register_url } from "../../utils/APIroutes";

const Register = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const toastOptions = {
    position: "right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { username, email, password } = formValues;
      let { data } = await axios.post(register_url, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        console.log(data.user);
        localStorage.setItem("chat-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirm_password } = formValues;
    if (password != confirm_password) {
      toast.error("Confirm passeword did not match !", toastOptions);
      return false;
    } else if (username.length < 4) {
      toast.error("Username must be greater than 3 characters", toastOptions);
      return false;
    } else if (email.length < 4) {
      toast.error("email must be greater than 3 characters", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <section className="register flex items-center justify-center w-full h-screen">
        <form
          className="md:w-1/2 w-full md:h-4/5 h-full bg-black rounded-3xl flex flex-col items-center justify-center gap-10 md:px-28"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="form-inputs"
            onChange={handleChange}
            value={formValues.username}
          />

          <input
            type="email"
            id="email"
            placeholder="Email"
            className="form-inputs"
            onChange={handleChange}
            value={formValues.email}
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            className="form-inputs"
            onChange={handleChange}
            value={formValues.password}
          />

          <input
            type="password"
            id="confirm_password"
            placeholder="Confirm Password"
            className="form-inputs"
            onChange={handleChange}
            value={formValues.confirm_password}
          />

          <button type="submit" className="submit-btn">
            Register
          </button>

          <p className="text-center text-gray-400">
            Already have an account? 
            <Link to={"/login"} className="text-blue-700 ps-2">
              Login
            </Link>
          </p>
        </form>
        <ToastContainer />
      </section>
    </>
  );
};

export default Register;
