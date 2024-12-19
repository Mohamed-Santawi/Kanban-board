import { useContext, useState } from "react";
import { Button, TextField } from ".";
import iconCross from "@assets/icon-cross.svg";
import { DataContext } from "@/DataContext";

/**
 * AddNewBoardForm component
 *
 * @param {Object} props
 * @param {Function} props.toggleDialog - Function to toggle the visibility of the dialog.
 * @param {number} [props.boardId] - The ID of the board being edited. If undefined, a new board is created.
 * @param {Array} [props.columns] - Initial array of columns for the board. Each column has a unique id.
 * @param {string} [props.title] - The initial title of the board.
 *
 * @returns {JSX.Element} A form for creating or updating a board, including its columns.
 */
export const AddNewBoardForm = ({
  toggleDialog,
  boardId,
  columns = [{ id: Date.now() }],
  title,
}) => {
  const { setData, setSelectedBoardIndex } = useContext(DataContext);
  const [columnsArray, setColumnsArray] = useState(columns);
  const removeColumnHandler = (id) => {
    setColumnsArray((prev) => prev.filter((item) => item.id !== id));
  };
  const addNewColumnHandler = () => {
    setColumnsArray((prev) => [...prev, { id: Date.now() }]);
  };
  const createNewColumsArray = (formData, columnsArray, boardId) => {
    return columnsArray.map((column) => {
      const tasksArray = boardId ? columnsArray.tasks : [];
      return {
        id: column.id,
        title: formData.get(column.id),
        tasks: tasksArray,
      };
    });
  };
  const updateData = (boardName, newColumnsArray, setData, boardId) => {
    setData((prev = []) => {
      let newData;
      if (boardId) {
        newData = prev.map((item) => {
          if (item.id === boardId) {
            return {
              ...item,
              title: boardName,
              columns: newColumnsArray,
            };
          }
          return item;
        });
      } else {
        newData = [
          ...prev,
          { id: Date.now(), title: boardName, columns: newColumnsArray },
        ];
        setSelectedBoardIndex(prev.length);
      }
      return newData;
    });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const boardName = formData.get("boardName");
    const newColumnsArray = createNewColumsArray(
      formData,
      columnsArray,
      boardId,
    );
    updateData(boardName, newColumnsArray, setData, boardId);
    toggleDialog(false);
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <h3 className="pb-2 pt-6 text-body-m text-medium-grey">Name</h3>
        <TextField
          placeholder="e.g. Web Design"
          name="boardName"
          defaultValue={title}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="pt-6 text-body-m text-medium-grey">Columns</h3>
        {columnsArray.map((obj) => (
          <div key={obj.id} className="flex items-center gap-4">
            <TextField
              placeholder="e.g. Web Design"
              name={obj.id}
              defaultValue={obj.title}
              required
            />
            <button type="button" onClick={() => removeColumnHandler(obj.id)}>
              <img src={iconCross} alt="icon cross" />
            </button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={addNewColumnHandler}
        >
          + Add New Column
        </Button>
      </div>
      <div className="mt-6">
        <Button type="submit" variant="primary" size="sm" isFullWidth>
          {boardId ? "Update" : "Create New"} Board
        </Button>
      </div>
    </form>
  );
};
