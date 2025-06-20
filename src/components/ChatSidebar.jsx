import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./ui/SearchBar";
import { setSelectedUser } from "@/store/messageSlice";
import Fuse from "fuse.js";
import SelectUser from "./SelectUser";

export default function () {
  const user = useSelector((state) => state.auth.authUser);
  const users = useSelector((state) => state.user.users);
  const selectedUser = useSelector((state) => state.message.selectedUser);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const fuseOptions = {
    isCaseSensitive: true,
    keys: ["username"],
  };
  const fuse = new Fuse(users, fuseOptions);

  const handleSearch = (value, focused) => {
    setSearch(value);
    setIsFocused(focused);
  };

  const filteredUsers =
    isFocused && search
      ? fuse.search(search).map((result) => result.item)
      : users;

  return (
    <div className="w-1/4 bg-gray-100 border-r p-4 hidden md:block">
      <div className="flex flex-col justify-between items-center my-4">
        <div className="w-full">
          <h2 className="text-lg font-bold uppercase tracking-widest">
            {user ? user?.username : "My Chat"}
          </h2>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="space-y-2">
        {filteredUsers.map((value, index) => (
          <SelectUser key={index} value={value} index={index} />
        ))}
      </div>
    </div>
  );
}
