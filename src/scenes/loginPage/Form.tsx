import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik, FormikErrors, FormikTouched } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import { FormikHelpers } from "formik";
import { RegisterValues, LoginValues } from "../../interface";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import notify from "../../hookes/toast";

interface FormValues extends RegisterValues, LoginValues {}

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [pageType, setPageType] = useState("register");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (
    values: RegisterValues,
    onsubmitProps: FormikHelpers<RegisterValues | LoginValues>
  ) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (const value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const saveUserResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`,
      formData
    );

    const savedUser = saveUserResponse.data;
    onsubmitProps.resetForm();
    if (savedUser) {
      notify("Account is created succesfully");
      setPageType("login");
    }
  };

  const login = async (
    values: LoginValues,
    onSubmitProps: FormikHelpers<RegisterValues | LoginValues>
  ) => {
    const loginResponse = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
      values
    );

    const loggedIn = await loginResponse.data;
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      notify("Verified");
      navigate("/home");
    }
  };

  const handleFormSubmit = async (
    values: RegisterValues | LoginValues,
    onSubmitProps: FormikHelpers<RegisterValues | LoginValues>
  ) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  const handlePasswordChange = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isRegister ? initialValuesRegister : initialValuesLogin}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as FormValues).firstName}
                  name="firstName"
                  error={
                    Boolean((touched as FormikTouched<FormValues>).firstName) &&
                    Boolean((errors as FormikErrors<FormValues>).firstName)
                  }
                  helperText={
                    (touched as FormikTouched<FormValues>).firstName &&
                    (errors as FormikErrors<FormValues>).firstName
                  }
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as FormValues).lastName}
                  name="lastName"
                  error={
                    Boolean((touched as FormikTouched<FormValues>).lastName) &&
                    Boolean((errors as FormikErrors<FormValues>).lastName)
                  }
                  helperText={
                    (touched as FormikTouched<FormValues>).lastName &&
                    (errors as FormikErrors<FormValues>).lastName
                  }
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as FormValues).location}
                  name="location"
                  error={
                    Boolean((touched as FormikTouched<FormValues>).location) &&
                    Boolean((errors as FormikErrors<FormValues>).location)
                  }
                  helperText={
                    (touched as FormikTouched<FormValues>).location &&
                    (errors as FormikErrors<FormValues>).location
                  }
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as FormValues).occupation}
                  name="occupation"
                  error={
                    Boolean(
                      (touched as FormikTouched<FormValues>).occupation
                    ) &&
                    Boolean((errors as FormikErrors<FormValues>).occupation)
                  }
                  helperText={
                    (touched as FormikTouched<FormValues>).occupation &&
                    (errors as FormikErrors<FormValues>).occupation
                  }
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  borderRadius="5px"
                  border={`1px solid ${palette.neutral.medium}`}
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      console.log(acceptedFiles);
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />{" "}
                        {!(values as FormValues).picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>
                              {(values as FormValues).picture.name}
                            </Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={(values as FormValues).email}
              name="email"
              error={
                Boolean((touched as FormikTouched<FormValues>).email) &&
                Boolean((errors as FormikErrors<FormValues>).email)
              }
              helperText={
                (touched as FormikTouched<FormValues>).email &&
                (errors as FormikErrors<FormValues>).email
              }
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={(values as FormValues).password}
              name="password"
              error={
                Boolean((touched as FormikTouched<FormValues>).password) &&
                Boolean((errors as FormikErrors<FormValues>).password)
              }
              helperText={
                (touched as FormikTouched<FormValues>).password &&
                (errors as FormikErrors<FormValues>).password
              }
              sx={{ gridColumn: "span 4" }}
              // Use endAdornment to display the icon at the end/right side of the TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    onClick={handlePasswordChange}
                  >
                    {showPassword ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {/* Button */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  color: palette.primary.main,
                },
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": { cursor: "pointer", color: palette.primary.light },
              }}
            >
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
