import { useFormik } from "formik";
const LoginForm = () => {
  const validate = values =>{
    const errors = {}
    if(!values.email){
      errors.email = "please enter the email"
    }

    if(!values.phoneNo){
      errors.phoneNo = "please enter the mobile number";
    }else if(values.phoneNo.length < 10){
      errors.phoneNo ="phone number should be 10 numbers";
    }
    return errors;
  }

  const formik = useFormik({
    initialValues:{
      email:'',
      phoneNo:"",
    },
    validate,
    onSubmit: values=>{
      alert(JSON.stringify(values,null,2))
    }
  })

  return (
    <>
      <h1>Login form</h1>
      <form onSubmit={formik.handleSubmit}>
        <label>Email</label>
        <input id="email" onChange={formik.handleChange}
        value={formik.values.email}/>
        {formik.errors.email ? <div>{formik.errors.email}</div>:""}

        <label>Phone No</label>
        <input id="phoneNo" onChange={formik.handleChange}
        value={formik.values.phoneNo}/>
        {formik.errors.phoneNo ? <div>{formik.errors.phoneNo}</div>:""}

        <button type="submit">login</button>
      </form>
    </>
  );
};
export default LoginForm;
