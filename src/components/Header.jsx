import { useContext, useState } from "react";
import { AddNewBoardForm, DialogPrimitive, DropdownPrimitive } from ".";
import iconVerticalEllipsis from "@assets/icon-vertical-ellipsis.svg";
import { DataContext } from "@/DataContext";
export function Header() {
  const [open, setOpen] = useState(false);
  const { data, setData, setSelectedBoardIndex, selectedBoardIndex } =
    useContext(DataContext);
  const onEditBoard = () => setOpen(true);
  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      setData((prev) => {
        const updatedData = prev.toSpliced(selectedBoardIndex, 1);
        // Set the selected board index to a safe value
        if (updatedData.length === 0) {
          setSelectedBoardIndex(null); // Or handle "no boards" state
        } else if (selectedBoardIndex >= updatedData.length) {
          setSelectedBoardIndex(updatedData.length - 1); // Select the last board
        }
        return updatedData;
      });
    }
  };

  return (
    <header className="flex h-[97px] shrink-0 items-center">
      <div className="flex w-[300px] items-center gap-4 self-stretch border-b border-r border-lines-light pl-8 text-[32px] font-bold">
        Kanban
      </div>
      <div className="flex flex-1 items-center justify-between self-stretch border-b border-r border-lines-light pl-6 pr-6">
        <h2 className="text-heading-xl">Platform Launch</h2>
        <DropdownPrimitive
          items={{
            edit: {
              label: "Edit Board",
              onClick: onEditBoard,
            },
            delete: { label: "Delete", onClick: onDelete },
          }}
          triggerComponent={() => (
            <button className="flex items-center gap-2 p-6 text-[14px] font-bold text-main-purple">
              <img src={iconVerticalEllipsis} alt="icon vertical ellipsis" />
            </button>
          )}
        />
        <DialogPrimitive isOpen={open} setOpen={setOpen} title="Edit Board">
          <AddNewBoardForm
            toggleDialog={setOpen}
            boardId={data[selectedBoardIndex]?.id}
            title={data[selectedBoardIndex]?.title}
            columns={data[selectedBoardIndex]?.columns}
          />
        </DialogPrimitive>
      </div>
    </header>
  );
}
