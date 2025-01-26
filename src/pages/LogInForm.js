import { useFormik } from "formik";
import Accordion from "../componets/Accordion";
import { useContext } from "react";
import userContext from "../utils/userContext";

const LoginForm = () => {
  const { user, setUser } = useContext(userContext);
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "please enter the email";
    }

    if (!values.name) {
      errors.phoneNo = "please enter the name";
    } else if (values.name.length < 3) {
      errors.phoneNo = "name should be 10 numbers";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    validate,
    onSubmit: (values) => {
      setUser({ email: values.email, name: values.name });
      values.email="";
      values.name="";
    },
  });

  return (
    <>
      <h1>Login form</h1>
      <form className="border flex flex-col p-4 w-96" onSubmit={formik.handleSubmit}>
        <div>
          <label>Name</label>
          <input
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="border p-1 ml-1 rounder-sm"
          />
          {formik.errors.name ? (
            <div className="text-red-800">{formik.errors.name}</div>
          ) : (
            ""
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="border p-1 ml-1 rounded-md"
          />
          {formik.errors.email ? (
            <div className="text-red-800">{formik.errors.email}</div>
          ) : (
            ""
          )}
        </div>

        <button  className="border bg-sky-500 p-2" type="submit">login</button>
      </form>

      <Accordion />
    </>
  );
};
export default LoginForm;
