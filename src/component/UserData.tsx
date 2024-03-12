import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useUserStore } from "../store/user-store";
import { User } from "../models/model";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import UpdateUserModal from "./UpdateUser";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "email",
    headerName: "Email",
    width: 90,
  },
  {
    field: "updatedAt",
    headerName: "Modified",
    width: 90,
    valueFormatter: (params) => format(new Date(params.value), "MM/YYY"),
  },
  {
    field: "action",
    headerName: "Action",
    width: 90,
    renderCell: (params) => (
      <div>
        <IconButton onClick={() => console.log("Update")}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => console.log("Delete")}>
          <Delete />
        </IconButton>
      </div>
    ),
  },
];

export default function Userdata() {
  const { users, initUsers } = useUserStore();
  const [userToUpdate, setUserToUpdate] = useState<User>();

  useEffect(() => {
    initUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ height: 400, width: "100%", margin:1 }}>
      {userToUpdate !== undefined && <UpdateUserModal user={userToUpdate} />}
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
    </div>
  );
}
