import { FC, useEffect, useState } from "react";

// styles and other things
import styles from '../styles/pages/login.module.scss';
import { STRING } from "../config/string";
import { useFormik } from "formik";
import { RegisterInterface } from "../interface/interface";
import { loginValidationSchema, registerValidationSchema } from "../validations/validation";
import InputField from "../components/InputField";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../middleware/auth";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTE_URLS from "../config/routes";

const Login: FC = () => {
  const [isLoginUser, setIsLoginUser] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isRegisterLoading,
    registerUserDetails,
    registerUsererror,
    loginUserDetails,
    isLoginLoading,
    loginUserError
  } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!isRegisterLoading) {
      if (registerUserDetails) {
        toast.success("Registered Successfully!");
        formik.resetForm();
        setIsLoginUser(true)
      }
      if (registerUsererror) {
        toast.error("Something went wrong!");
        formik.setSubmitting(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegisterLoading, registerUserDetails, registerUsererror]);


  useEffect(() => {
    if (!isLoginLoading) {
      if (loginUserDetails) {
        toast.success("Login Successfully!");
        formik.resetForm();
        navigate(ROUTE_URLS.HOME, { replace: true });
      }
      if (loginUserError) {
        toast.error("Invalid credentials!");
        formik.setSubmitting(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginLoading, loginUserDetails, loginUserError]);

  useEffect(() => {
    formik.resetForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginUser]);

  // user register funtion
  const handleRegisterSubmit = async (values: RegisterInterface) => {
    try {
      await dispatch(registerUser(values));

    } catch (error) {
      console.error(error);
    }
  };

  // user login funtion
  const handleLoginSubmit = async (values: RegisterInterface) => {
    try {
      await dispatch(loginUser(values));
    } catch (error) {
      console.error(error);
    }
  };

  // initial values
  const initialValues: RegisterInterface = {
    email: "",
    password: "",
    username: "",
  };

  // formik setup
  const formik = useFormik({
    initialValues,
    validationSchema: isLoginUser ? loginValidationSchema : registerValidationSchema,
    onSubmit: isLoginUser ? handleLoginSubmit : handleRegisterSubmit,
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className={styles.loginContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <span className={styles.login}>{isLoginUser ? STRING.LOGIN : STRING.REGISTER}</span>

        {/* Username Field (only for Registration) start */}
        {!isLoginUser && (
          <InputField
            label="User Name"
            name="username"
            type="text"
            placeholder="User Name"
            value={values.username}
            onBlur={handleBlur}
            onChange={handleChange}
            error={errors.username}
            touched={touched.username}
          />
        )}
        {/* Username Field (only for Registration) end */}

        {/* Email Field start */}
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter Email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.email}
          touched={touched.email}
        />
        {/* Email Field end */}

        {/* Password Field  start*/}
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="********"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors.password}
          touched={touched.password}
        />
        {/* Password Field end */}

        <div className={styles.buttonContainer}>
          <button disabled={formik.isSubmitting} type="submit" className={styles.button}>
            {isLoginUser ? formik.isSubmitting ? "Loading..." : "Login" : formik.isSubmitting ? "Loading..." : "Register"}
          </button>

          {/* Login/Register Switch */}
          <span className={styles.registerLink}>
            {isLoginUser ? "Not a member? " : ""}
            <span onClick={() => setIsLoginUser(!isLoginUser)} className={styles.link}>
              {isLoginUser ? "Create Account" : "Login"}
            </span>
          </span>
        </div>
      </form>
    </div>
  );
};



export default Login;
