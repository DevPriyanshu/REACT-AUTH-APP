import * as React from "react";
import Box from "@mui/material/Box";
import { AccountCircle, Mail } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import { User } from "../models/model";
import { FormProvider, RHFTextField } from "./hook-form";
import { Stack } from "@mui/system";
import { InputAdornment, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axios-config";
import { useUserStore } from "../store/user-store";
import { useSnackbar } from "../context/snackbar-context";
import Page from "./Page";
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

  React.useEffect(() => {
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
  }

  const hitAddUserApi = async (data: User) => {
    try {
      const response = await axiosInstance.post(`users`, {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      addUser(response.data);
      handleOpen();
      showSnackbar(`User Added: ${response.data.id}`, "success");
    } catch (error) {
      console.error("Error fetching data:", error);
      showSnackbar(`Error while adding the user`, "error");
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
