// import { DataContext } from "@/DataContext";
// import { Card } from "./Card";
// import { useContext } from "react";
// import { produce } from "immer";

// /**
//  *
// @param {Object} props
//  * @param {String} props.title
//  * @param {Array} props.tasks
//  * @returns  {JSX.Element}
//  */

// export function Column({ id, title, tasks = [], columnIndex }) {
//   const { setData, selectedBoardIndex } = useContext(DataContext);

//   const createNewTask = () => {
//     return {
//       id: Date.now(),
//       title: "New Task",
//     };
//   };
//   const addNewTaskHandler = () => {
//     const newTask = createNewTask();
//     setData((prev) =>
//       produce(prev, (draft) => {
//         const selectedBoard = draft[selectedBoardIndex];

//         // Update the selected board's columns by adding the new task to the correct column
//         selectedBoard.columns = selectedBoard.columns.map((column) => {
//           if (column.id === id) {
//             column.tasks.push(newTask); // Directly mutate the tasks array
//           }
//           return column;
//         });
//       }),
//     );
//   };
//   const onDeleteHandler = () => {
//     if (window.confirm("Are you sure you want to delete this column?")) {
//       setData((prev) =>
//         produce(prev, (draft) => {
//           draft[selectedBoardIndex].columns = draft[
//             selectedBoardIndex
//           ].columns.filter((column) => column.id !== id);
//         }),
//       );
//     }
//   };
//   return (
//     <div className="flex w-72 shrink-0 flex-col self-start rounded-lg bg-lines-light px-2 shadow">
//       <h2 className="group/column relative top-0 rounded bg-lines-light px-2 py-4 text-heading-s">
//         {title} ({tasks.length})
//         <button
//           className="absolute bottom-0 right-0 top-0 p-2 text-body-m text-red opacity-0 duration-300 focus:opacity-100 group-hover/column:opacity-100"
//           onClick={onDeleteHandler}
//         >
//           Delete
//         </button>
//       </h2>

//       <div className="mb-5 flex flex-col gap-5">
//         {tasks.map((item, index) => (
//           <Card
//             key={item.id}
//             title={item.title}
//             description={item.description}
//             columnId={id}
//             cardId={item.id}
//             cardIndex={index}
//             columnIndex={columnIndex}
//           />
//         ))}
//       </div>
//       <button
//         className="-mx-2 mt-auto border-t border-light-grey bg-lines-light px-2 py-4 text-heading-m text-medium-grey"
//         onClick={addNewTaskHandler}
//       >
//         + Add New Task
//       </button>
//     </div>
//   );
// }

import { DataContext } from "@/DataContext";
import { Card } from "./Card";
import { useContext } from "react";
import { produce } from "immer";

/**
 *
@param {Object} props
 * @param {String} props.title
 * @param {Array} props.tasks
 * @returns  {JSX.Element}
 */

export function Column({ id, title, tasks = [], columnIndex }) {
  const { setData, selectedBoardIndex } = useContext(DataContext);

  const createNewTask = () => {
    return {
      id: Date.now(),
      title: "New Task",
    };
  };

  const addNewTaskHandler = () => {
    const newTask = createNewTask();
    setData((prev) =>
      produce(prev, (draft) => {
        const selectedBoard = draft[selectedBoardIndex];

        // Ensure tasks is always an array and add the new task immutably
        selectedBoard.columns = selectedBoard.columns.map((column) => {
          if (column.id === id) {
            // Make sure column.tasks is an array before trying to add the new task
            column.tasks = Array.isArray(column.tasks)
              ? [...column.tasks, newTask]
              : [newTask];
          }
          return column;
        });
      }),
    );
  };

  const onDeleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this column?")) {
      setData((prev) =>
        produce(prev, (draft) => {
          draft[selectedBoardIndex].columns = draft[
            selectedBoardIndex
          ].columns.filter((column) => column.id !== id);
        }),
      );
    }
  };

  return (
    <div className="flex w-72 shrink-0 flex-col self-start rounded-lg bg-lines-light px-2 shadow">
      <h2 className="group/column relative top-0 rounded bg-lines-light px-2 py-4 text-heading-s">
        {title} ({tasks.length})
        <button
          className="absolute bottom-0 right-0 top-0 p-2 text-body-m text-red opacity-0 duration-300 focus:opacity-100 group-hover/column:opacity-100"
          onClick={onDeleteHandler}
        >
          Delete
        </button>
      </h2>

      <div className="mb-5 flex flex-col gap-5">
        {tasks.map((item, index) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            columnId={id}
            cardId={item.id}
            cardIndex={index}
            columnIndex={columnIndex}
          />
        ))}
      </div>
      <button
        className="-mx-2 mt-auto border-t border-light-grey bg-lines-light px-2 py-4 text-heading-m text-medium-grey"
        onClick={addNewTaskHandler}
      >
        + Add New Task
      </button>
    </div>
  );
}
