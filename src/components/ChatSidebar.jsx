import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./ui/SearchBar";
import { setSelectedUser } from "@/store/messageSlice";
import Fuse from "fuse.js";
import SelectUser from "./SelectUser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import CreateGroup from "./CreateGroup";
import { getAllGroups } from "@/apis";
import { setGroups } from "@/store/groupSlice";
import { toast } from "react-toastify";

export default function () {
  const user = useSelector((state) => state.auth.authUser);
  const users = useSelector((state) => state.user.users);
  const selectedUser = useSelector((state) => state.message.selectedUser);
  const groups = useSelector((state) => state.group.groups);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    getAllGroups()
      .then((res) => {
        dispatch(setGroups(res?.data?.data));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.message);
      });
  }, []);

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
      <div className="w-full  mb-4 ">
        <Tabs defaultValue="users" className="w-full">
          <TabsList className={"w-full"}>
            <TabsTrigger value="users" className={"cursor-pointer"}>
              Users
            </TabsTrigger>
            <TabsTrigger value="groups" className={"cursor-pointer"}>
              Group
            </TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-1">
              {filteredUsers.map((value, index) => (
                <SelectUser
                  key={index}
                  value={value}
                  index={index}
                  type="user"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="groups">
            <div className="flex flex-col">
              <CreateGroup />
              <div className="flex flex-col gap-2  mt-2 ">
                {groups.map((value, index) => (
                  <SelectUser
                    key={index}
                    value={value}
                    index={index}
                    type="group"
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
