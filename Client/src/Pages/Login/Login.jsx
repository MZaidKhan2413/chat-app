import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { login_url } from "../../utils/APIroutes";

const Login = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  useEffect(()=>{
    if(localStorage.getItem("chat-user")) {
      navigate("/");
    }
  }, [])

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formValues;
    const {data} = await axios.post(login_url, {
        username, password
    })
    if(data.status === false) {
      alert(data.msg);
    } else {
      console.log(data.user);
      localStorage.setItem("chat-user", JSON.stringify(data.user));
      navigate("/");
    }
  }
  return (
    <>
      <section
        className="register flex items-center justify-center w-full h-screen"
        onSubmit={handleSubmit}
      >
        <form className="md:w-1/2 w-full md:h-4/5 h-full bg-black rounded-3xl flex flex-col items-center justify-center gap-10 md:px-28">
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="form-inputs"
            onChange={handleChange}
            value={formValues.username}
            required
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            className="form-inputs"
            onChange={handleChange}
            value={formValues.password}
            required
          />

          <button type="submit" className="submit-btn">
            Login
          </button>

          <p className="text-center text-gray-400">
            Don't have an account?
            <Link to={"/register"} className="text-blue-700 ps-2">
              Register
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
