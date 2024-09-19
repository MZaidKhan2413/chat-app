import { useState } from "react";
import "./Register.css";

const Register = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormValues({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <section
      className="register flex items-center justify-center w-full h-screen"
      onSubmit={handleSubmit}
    >
      <form className="md:w-1/2 w-full md:h-4/5 h-full bg-black rounded-3xl flex flex-col items-center justify-center gap-10 px-28">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="form-inputs"
          onChange={handleChange}
        />

        <input
          type="email"
          id="email"
          placeholder="Email"
          className="form-inputs"
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="form-inputs"
          onChange={handleChange}
        />

        <input
          type="password"
          id="confirm_password"
          placeholder="Confirm Password"
          className="form-inputs"
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;
