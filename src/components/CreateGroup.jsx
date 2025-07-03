import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import { createGroup } from "@/apis";
import { addGroup } from "@/store/groupSlice";

function CreateGroup() {
  const users = useSelector((state) => state.user.users);
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (selectedUser) => {
    setSelectedMembers((prev) =>
      prev.includes(selectedUser)
        ? prev.filter((i) => i !== selectedUser)
        : [...prev, selectedUser]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim().length < 3) {
      toast.error("Give the Proper Name of the Group.");
      return;
    }

    if (selectedMembers.length <= 0) {
      toast.error("Please Select At Least One User.");
      return;
    }
    const formData = {
      name: groupName,
      members: selectedMembers,
    };
    createGroup(formData)
      .then((res) => {
        dispatch(addGroup(res?.data?.data));
      })
      .catch((err) => {
        toast.error(err);
      });
    setIsOpen(false);
    toast.success("Group created successfully!");

    setGroupName("");
    setSelectedMembers([]);
  };

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button
            className="w-full cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Create Group
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <form onSubmit={handleSubmit}>
            <AlertDialogHeader>
              <AlertDialogTitle>Select Users</AlertDialogTitle>
              <AlertDialogDescription>
                Choose members and enter a group name.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <Input
              className="mt-2"
              placeholder="Enter the Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />

            <div className="flex flex-col gap-1 mt-2 max-h-[200px] overflow-y-auto">
              {users.map((user, index) => (
                <Label
                  key={index}
                  className="hover:bg-accent/50 flex my-1 items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                >
                  <Checkbox
                    id={`user-${index}`}
                    checked={selectedMembers.includes(user)}
                    onCheckedChange={() => handleChange(user)}
                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                  />
                  <div className="grid gap-1.5 font-normal">
                    <div className="text-sm leading-none font-medium uppercase">
                      {user.username}
                    </div>
                  </div>
                </Label>
              ))}
            </div>

            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel onClick={() => setIsOpen(false)}>
                Cancel
              </AlertDialogCancel>

              {/* Use normal button, not AlertDialogAction */}
              <Button type="submit">Create</Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CreateGroup;
