import clsx from "clsx";
import { useContext, useState } from "react";
import iconBoard from "@assets/icon-board.svg";
import { AddNewBoardForm, DialogPrimitive } from ".";
import { DataContext } from "@/DataContext";

/**
 * Renders the side menu that contains a list of all boards and allows the user
 * to select a board to view. It also contains a button to create a new board.
 * @returns {JSX.Element} The side menu
 */
/**
 * @props {Object} props
 * @prop {Array} props.data - The list of boards
 * @prop {number} props.selectedBoardIndex - The index of the currently selected
 *   board
 * @prop {function} props.setSelectedBoardIndex - The function to run when the
 *   selected board changes
 * @prop {boolean} props.open - Whether the "Create New Board" dialog is open
 * @prop {function} props.setOpen - The function to run when the "Create New
 *   Board" dialog should be toggled
 */
export function SideMenu() {
  const { data, selectedBoardIndex, setSelectedBoardIndex } =
    useContext(DataContext);
  const [open, setOpen] = useState(false);
  return (
    <aside className="side-menu -mt-px w-[300px] border-r border-lines-light bg-white">
      <p className="px-8 py-4 text-heading-m">ALL BOARDS {data.length}</p>
      <ul>
        {data.map((item, index) => (
          <li key={item.id}>
            <button
              className={clsx(
                "flex w-11/12 items-center gap-4 rounded-e-full px-8 py-4 text-heading-m text-medium-grey transition data-[isactive=false]:hover:bg-main-purple/10 data-[isactive=false]:hover:text-main-purple",
                {
                  "bg-main-purple !text-white hover:bg-main-purple":
                    selectedBoardIndex === index,
                },
              )}
              data-isactive={selectedBoardIndex === index}
              onClick={() => setSelectedBoardIndex(index)}
            >
              <img src={iconBoard} alt="" />
              {item.title}
            </button>
          </li>
        ))}
        <li className="px-8 py-4">
          <DialogPrimitive
            isOpen={open}
            setOpen={setOpen}
            title="Create New Board"
            triggerComponent={
              <button className="flex w-full items-center gap-4 text-heading-m text-main-purple">
                <img src={iconBoard} alt="" /> + Create New Board
              </button>
            }
          >
            <AddNewBoardForm toggleDialog={setOpen} />
          </DialogPrimitive>
        </li>
      </ul>
    </aside>
  );
}
