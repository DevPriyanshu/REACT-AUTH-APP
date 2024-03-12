import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AccountCircle, Mail } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import { User } from "../models/model";
import { FormProvider, RHFTextField } from "./hook-form";
import { Stack } from "@mui/system";
import { InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axios-config";
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
  user: User;
}

function UpdateUserModal({ user }: Readonly<IUpdateUserModalProps>) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const methods = useForm<User>({
    mode: "all",
  });

  function resetForm() {
    setValue("email", user.email);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
  }

  const hitLoginApi = async (data: User) => {
    try {
    
      const response = await axiosInstance.post(`users/${user.id}`, {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      console.log({ response });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onSubmit = async (data: User) => {
    hitLoginApi(data);
  };

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = methods;
  return (
    <div>
      <Button onClick={handleOpen}>User To Update</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                Update
              </LoadingButton>
            </Stack>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}
export default UpdateUserModal;
