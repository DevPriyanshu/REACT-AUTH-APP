import { AccountCircle, PasswordOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, InputAdornment, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { JwtAuthenticationControllerApi, JwtRequest } from "../api";
import { FormProvider, RHFTextField } from "./hook-form";
import { ApiConfiguration } from "../api/api-config";
import * as yup from "yup";
import { useSnackbar } from "../context/snackbar-context";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
export default function Login() {
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

  const onSubmit = async (data: JwtRequest) => {
    new JwtAuthenticationControllerApi(ApiConfiguration)
      .createAuthenticationTokenUsingPOST(data)
      .then((res) => {
        console.log(res.data);
        setAuthData(res.data);
        navigate("/home");
        showSnackbar(`Loggged In Succesfully.`, "success");
      })
      .catch((error) => {
        showSnackbar(error.message, "error");
      });
  };

  return (
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
  );
}
