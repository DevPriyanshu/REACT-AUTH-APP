import { AccountCircle, PasswordOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, InputAdornment, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, RHFTextField } from "./hook-form";
import * as yup from "yup";
import { useSnackbar } from "../context/snackbar-context";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { JwtRequest } from "../models/model";
import axiosInstance from "../api/axios-config";
import Page from "./Page";

function Login() {
  const { showSnackbar } = useSnackbar();
  const { setAuthData } = useAuthContext();
  const navigate = useNavigate();
  const CustomerRequestValidationSchema = (): any => {
    return yup.object().shape({
      username: yup.string().required("UserName is required"),
      password: yup.string().required("Password is required"),
    });
  };

  const methods = useForm<JwtRequest>({
    resolver: yupResolver(CustomerRequestValidationSchema()),
    mode: "all",
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = methods;

  const hitLoginApi = async (data: JwtRequest) => {
    try {
      const response = await axiosInstance.post("authenticate", {
        username: data.username,
        password: data.password,
      });

      setAuthData(response.data.jwttoken);
      localStorage.setItem("token", response.data.jwttoken);
      navigate("/home");
      showSnackbar("Login Success", "success");
    } catch (error: any) {
      showSnackbar(`Login Failed : ${error.response.data.message}`, "error");
    }
  };

  const onSubmit = async (data: JwtRequest) => {
    hitLoginApi(data);
  };

  return (
    <Page title="Login">
      <Box justifyContent={"center"} display={"flex"} m={30}>
        <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
          <Stack spacing={3}>
            <RHFTextField
              name="username"
              placeholder="Username"
              variant="outlined"
              error={!!errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              type="password"
              name="password"
              placeholder="Password"
              variant="outlined"
              error={!!errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordOutlined fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <LoadingButton
              type="submit"
              loading={isSubmitting}
              variant="contained"
              disabled={!isValid}
            >
              Login
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Page>
  );
}
// Login. = "Login";
export default Login;
