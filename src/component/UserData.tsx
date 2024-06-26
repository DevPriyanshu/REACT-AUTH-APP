import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useUserStore } from "../store/user-store";
import { User } from "../models/model";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import UpdateUserModal from "./UpdateUser";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axiosInstance from "../api/axios-config";
import { useTheme } from "@mui/material";
import { useSnackbar } from "../context/snackbar-context";
interface IUserdataProps {
  users: User[];
}
export default function Userdata({ users }: Readonly<IUserdataProps>) {
  const theme = useTheme();
  const { showSnackbar } = useSnackbar();
  const { initUsers, deleteUser } = useUserStore();
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<User>();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 100 },
    { field: "lastName", headerName: "Last name", width: 100 },
    {
      field: "email",
      headerName: "Email",
      width: 130,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 150,
      valueFormatter: (params) =>
        format(new Date(params.value), "E d/MM hh:mm a"),
    },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 130,
    },
    {
      field: "roles",
      headerName: "Access type",
      width: 150,
      valueGetter: (params) => {
        const roles = params.row.roles.map((role: { roleType: string }) =>
          role.roleType.replace("ROLE_", "")
        );
        return roles.join(", ");
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: ({ row }) => (
        <div>
          <IconButton
            sx={{ color: theme.palette.primary.main }}
            onClick={() => handleEditBtn(row)}
          >
            <Edit />
          </IconButton>
          <IconButton
            sx={{ color: theme.palette.primary.main }}
            onClick={() => handleDeleteBtn(row.id)}
          >
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  console.log({ users });
  function handleUpdateUserClick() {
    setIsUpdateUserOpen((prevIsOpen) => !prevIsOpen);
  }

  const hitDelteUserApi = async (userId: number) => {
    try {
      await axiosInstance.delete(`/user/${userId}`);
      deleteUser(userId);
      showSnackbar(`User Deleted: ${userId}`, "success");
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        showSnackbar(`${error.response.data.message}`, "error");
      } else {
        showSnackbar(`${error}`, "error");
      }
    }
  };

  function handleDeleteBtn(userId: number) {
    hitDelteUserApi(userId);
  }
  function handleEditBtn(user: User) {
    handleUpdateUserClick();
    setUserToUpdate(user);
  }
  useEffect(() => {
    initUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ height: 400, width: "100%", margin: 1 }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      {isUpdateUserOpen && (
        <UpdateUserModal
          user={userToUpdate}
          isOpen={isUpdateUserOpen}
          handleOpen={handleUpdateUserClick}
        />
      )}
    </div>
  );
}
