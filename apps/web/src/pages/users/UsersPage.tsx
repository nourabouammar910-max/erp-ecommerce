import { useState } from "react";

import {
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import { Add } from "@mui/icons-material";

import SearchInput from "../../components/ui/SearchInput";
import Loader from "../../components/ui/Loader";

import { useUsers } from "./hooks/useUsers";
import UsersTable from "./components/UsersTable";
import UserModal from "./components/UserModal";

export default function UsersPage() {
  const { users, loading, refresh } = useUsers();

  const [open, setOpen] = useState(false);

  const [selectedUser, setSelectedUser] =
    useState<any>(null);

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Users
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setSelectedUser(null);
            setOpen(true);
          }}
        >
          Add User
        </Button>
      </Stack>

      <Stack mb={3}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by name, email or role..."
        />
      </Stack>

      {loading ? (
        <Loader />
      ) : (
        <UsersTable
          users={filteredUsers}
          refresh={refresh}
          onEdit={(user) => {
            setSelectedUser(user);
            setOpen(true);
          }}
        />
      )}

      <UserModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedUser(null);
        }}
        refresh={refresh}
        user={selectedUser}
      />
    </Paper>
  );
}