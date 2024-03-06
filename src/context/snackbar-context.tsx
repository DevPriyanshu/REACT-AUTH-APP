import { Clear } from "@mui/icons-material";
import { Snackbar, SnackbarContent } from "@mui/material";
import { FC, ReactNode, createContext, useContext, useState } from "react";
interface SnackbarContextProps {
  showSnackbar: (
    message: string,
    type: "error" | "warning" | "success"
  ) => void;
  type: "error" | "warning" | "success";
}

const snackbarStyle = {
  error: {
    backgroundColor: "rgb(239, 193, 193)",
    border: "2px solid #e70d0d",
    color: "rgb(247, 15, 15)",
  },
  warning: {
    backgroundColor: "rgb(181, 197, 242)",
    border: "2px solid rgb(6, 71, 249)",
    color: "rgb(24, 24, 24)",
  },
  success: {
    backgroundColor: "#daf8d7",
    border: "2px solid #15a308",
    color: "#0c0c0c",
  },
};

const getEnqueueSnackbarStyle = (type: string) => {
  if (type === "error") {
    return snackbarStyle.error;
  } else if (type === "success") {
    return snackbarStyle.success;
  } else if (type === "warning") {
    return snackbarStyle.warning;
  }
};

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState<
    "error" | "warning" | "success"
  >("success");

  const showSnackbar = (
    message: string,
    type: "error" | "warning" | "success"
  ) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const contextValue: SnackbarContextProps = {
    showSnackbar,
    type: snackbarType,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <SnackbarContent
          sx={{
            ...getEnqueueSnackbarStyle(snackbarType),
            display: "flex",
          }}
          message={<span>{snackbarMessage}</span>}
          action={<Clear onClick={closeSnackbar} sx={{ cursor: "pointer" }} />}
        />
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export { useSnackbar };
