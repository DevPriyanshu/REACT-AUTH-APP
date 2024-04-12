import * as React from "react";
import Box from "@mui/material/Box";
import { AccountCircle, Mail, Password } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import { User } from "../models/model";
import { FormProvider, RHFTextField } from "./hook-form";
import FaceIcon from "@mui/icons-material/Face";
import { Stack } from "@mui/system";
import { InputAdornment, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axios-config";
import { MenuItem } from "@mui/material";
import { useUserStore } from "../store/user-store";
import { useSnackbar } from "../context/snackbar-context";
import Page from "./Page";
import { useEffect } from "react";
import { RHFSelect } from "./hook-form/RHFSelect";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IUpdateUserModalProps {
  handleOpen: () => void;
  isOpen: boolean;
}

function UpdateUserModal({
  handleOpen,
  isOpen,
}: Readonly<IUpdateUserModalProps>) {
  const { addUser } = useUserStore();
  const { showSnackbar } = useSnackbar();
  //   const handleClose = () => setOpen(isOpen);

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const methods = useForm<User>({
    mode: "all",
  });

  function resetForm() {
    setValue("email", "");
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("username", "");
    setValue("password", "");
    setValue("roles", []);
  }
  const hitAddUserApi = async (data: User) => {
    console.log({ data });
    try {
      const response = await axiosInstance.post(
        `${data.roles.length === 0 ? `users` : `add-admin`}`,
        {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          password: data.password,
          roles: [
            {
              roleType: data.roles,
            }
          ],
        }
      );
      addUser(response.data);
      handleOpen();
      showSnackbar(`User Added: ${response.data.id}`, "success");
    } catch (error) {
      console.error("Error fetching data:", error);
      showSnackbar(`${error}`, "error");
    }
  };


  const onSubmit = async (data: User) => {
    hitAddUserApi(data);
  };

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = methods;
  return (
    <Page title="Add User">
      <Modal
        open={isOpen}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" mb={2} align="left" sx={{ marginLeft: 1 }}>
            Add User data..
          </Typography>
          <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
            <Stack spacing={3}>
              <RHFTextField
                name="email"
                placeholder="email"
                variant="outlined"
                error={!!errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                type="firstName"
                name="firstName"
                placeholder="firstName"
                variant="outlined"
                error={!!errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                type="lastName"
                name="lastName"
                placeholder="lastName"
                variant="outlined"
                error={!!errors.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                type="username"
                name="username"
                placeholder="username"
                variant="outlined"
                error={!!errors.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FaceIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                type="password"
                name="password"
                placeholder="password"
                variant="outlined"
                error={!!errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Password fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <RHFSelect
                name="roles"
                placeholder="password"
                variant="outlined"
                inputProps={{ required: true }}
              >
                <MenuItem value="ROLE_SUPER_ADMIN">ROLE_SUPER_ADMIN</MenuItem>
                <MenuItem value="ROLE_ADMIN">ROLE_ADMIN</MenuItem>
                <MenuItem value="ROLE_USER">ROLE_USER</MenuItem>
              </RHFSelect>
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                variant="contained"
                disabled={!isValid}
              >
                Add User
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </Page>
  );
}
export default UpdateUserModal;
