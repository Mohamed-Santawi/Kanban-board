// import { useContext, useMemo } from "react";
// import { Column } from "./Column";
// import { DataContext } from "@/DataContext";
// import { produce } from "immer";
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// export function WorkSpace() {
//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 10,
//       },
//     }),
//   );

//   const createNewColumn = (num) => ({
//     id: Date.now(),
//     title: `New Column ${num}`,
//     tasks: [],
//   });
//   const addNewColumnHandler = () => {
//     const num = data[selectedBoardIndex].columns.length + 1;
//     const newColumn = createNewColumn(num);
//     setData((prev) =>
//       produce(prev, (draft) => {
//         draft[selectedBoardIndex].columns.push(newColumn);
//       }),
//     );
//   };

//   const { data, selectedBoardIndex, setData } = useContext(DataContext);
//   const columns = data[selectedBoardIndex]?.columns;
//   const tasksIds = useMemo(() => {
//     let tasksIds = [];

//     if (!columns || columns.length === 0) return tasksIds;
//     for (let column of columns) {
//       tasksIds = [...tasksIds, ...column.tasks.map((task) => task.id)];
//     }
//     return tasksIds;
//   }, [columns]);
//   const onDragEndHandler = (event) => {
//     const { active, over } = event;
//     const activeId = active.id;
//     const overId = over.id;
//     const activeColumnId = active.data.current.columnId;
//     const overColumnId = over.data.current.columnId;
//     if (activeId === overId) return;
//     if (activeColumnId === overColumnId) {
//       const newColumns = columns.map((column) => {
//         if (column.id === activeColumnId) {
//           const activeIdIndex = column.tasks.findIndex(
//             (task) => task.id === activeId,
//           );
//           const overIdIndex = column.tasks.findIndex(
//             (task) => task.id === overId,
//           );
//           const tasks = arrayMove(column.tasks, activeIdIndex, overIdIndex);
//           return {
//             ...column,
//             tasks,
//           };
//         }
//         return column;
//       });
//       setData((prev) =>
//         produce(prev, (draft) => {
//           draft[selectedBoardIndex].columns = newColumns;
//         }),
//       );
//     }
//   };
//   const onDragOverHandler = (event) => {
//     const { active, over } = event;
//     const activeId = active.id;

//     const activeColumnId = active?.data?.current?.columnId;
//     const overColumnId = over?.data?.current?.columnId;
//     if (overColumnId && activeColumnId !== overColumnId) {
//       const newColumns = columns.map((column) => {
//         if (column.id === overColumnId) {
//           const activeTask = columns
//             .find((column) => column.id === activeColumnId)
//             ?.tasks.find((task) => task.id === activeId);
//           const tasks = [...(column.tasks || []), activeTask];
//           return {
//             ...column,
//             tasks,
//           };
//         }
//         if (column.id === activeColumnId) {
//           const tasks = column.tasks.filter((task) => task.id !== activeId);
//           return {
//             ...column,
//             tasks,
//           };
//         }
//         return column;
//       });
//       setData((prev) =>
//         produce(prev, (draft) => {
//           draft[selectedBoardIndex].columns = newColumns;
//         }),
//       );
//     }
//   };

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragEnd={onDragEndHandler}
//       onDragOver={onDragOverHandler}
//     >
//       <div className="flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto bg-light-grey p-6">
//         <SortableContext
//           items={tasksIds}
//           strategy={verticalListSortingStrategy}
//         >
//           {columns?.length &&
//             columns.map((item, index) => (
//               <Column
//                 key={item.id}
//                 id={item.id}
//                 title={item.title}
//                 tasks={item.tasks}
//                 columnIndex={index}
//               />
//             ))}
//         </SortableContext>
//         <button
//           className="w-72 shrink-0 self-start rounded-md bg-lines-light p-3 text-heading-l text-medium-grey"
//           onClick={addNewColumnHandler}
//         >
//           {" "}
//           + New Column
//         </button>
//       </div>
//     </DndContext>
//   );
// }

import { useContext, useMemo } from "react";
import { Column } from "./Column";
import { DataContext } from "@/DataContext";
import { produce } from "immer";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export function WorkSpace() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const createNewColumn = (num) => ({
    id: Date.now(),
    title: `New Column ${num}`,
    tasks: [],
  });

  const addNewColumnHandler = () => {
    const num = columns.length + 1; // Use columns instead of directly referencing data[selectedBoardIndex]
    const newColumn = createNewColumn(num);
    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex].columns.push(newColumn);
      }),
    );
  };

  const { data, selectedBoardIndex, setData } = useContext(DataContext);

  // Move the columns initialization into its own useMemo hook
  const columns = useMemo(() => {
    return Array.isArray(data[selectedBoardIndex]?.columns)
      ? data[selectedBoardIndex]?.columns
      : []; // Default to empty array if undefined or not an array
  }, [data, selectedBoardIndex]);

  const tasksIds = useMemo(() => {
    let tasksIds = [];

    if (!columns || columns.length === 0) return tasksIds;
    for (let column of columns) {
      // Check if column.tasks is defined and is an array before calling map
      if (Array.isArray(column.tasks)) {
        tasksIds = [...tasksIds, ...column.tasks.map((task) => task.id)];
      }
    }
    return tasksIds;
  }, [columns]); // Only recompute tasksIds when columns change

  const onDragEndHandler = (event) => {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over.id;
    const activeColumnId = active.data.current.columnId;
    const overColumnId = over.data.current.columnId;
    if (activeId === overId) return;

    if (activeColumnId === overColumnId) {
      const newColumns = columns.map((column) => {
        if (column.id === activeColumnId) {
          const activeIdIndex = column.tasks.findIndex(
            (task) => task.id === activeId,
          );
          const overIdIndex = column.tasks.findIndex(
            (task) => task.id === overId,
          );
          const tasks = arrayMove(column.tasks, activeIdIndex, overIdIndex);
          return {
            ...column,
            tasks,
          };
        }
        return column;
      });

      setData((prev) =>
        produce(prev, (draft) => {
          draft[selectedBoardIndex].columns = newColumns;
        }),
      );
    }
  };

  const onDragOverHandler = (event) => {
    const { active, over } = event;
    const activeId = active.id;

    const activeColumnId = active?.data?.current?.columnId;
    const overColumnId = over?.data?.current?.columnId;

    if (overColumnId && activeColumnId !== overColumnId) {
      const newColumns = columns.map((column) => {
        if (column.id === overColumnId) {
          const activeTask = columns
            .find((column) => column.id === activeColumnId)
            ?.tasks.find((task) => task.id === activeId);
          const tasks = [...(column.tasks || []), activeTask];
          return {
            ...column,
            tasks,
          };
        }
        if (column.id === activeColumnId) {
          const tasks = column.tasks.filter((task) => task.id !== activeId);
          return {
            ...column,
            tasks,
          };
        }
        return column;
      });

      setData((prev) =>
        produce(prev, (draft) => {
          draft[selectedBoardIndex].columns = newColumns;
        }),
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEndHandler}
      onDragOver={onDragOverHandler}
    >
      <div className="flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto bg-light-grey p-6">
        <SortableContext
          items={tasksIds}
          strategy={verticalListSortingStrategy}
        >
          {columns.length > 0 &&
            columns.map((item, index) => (
              <Column
                key={item.id}
                id={item.id}
                title={item.title}
                tasks={item.tasks}
                columnIndex={index}
              />
            ))}
        </SortableContext>
        <button
          className="w-72 shrink-0 self-start rounded-md bg-lines-light p-3 text-heading-l text-medium-grey"
          onClick={addNewColumnHandler}
        >
          + New Column
        </button>
      </div>
    </DndContext>
  );
}
