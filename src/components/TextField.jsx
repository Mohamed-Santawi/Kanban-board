// import clsx from "clsx";

// export const TextField = ({
//   placeholder,
//   isInvalid,
//   name,
//   required,
//   defaultValue,
// }) => {
//   return (
//     <div className="relative flex min-w-80 flex-1 items-center">
//       {isInvalid && (
//         <span className="absolute right-4 text-body-l text-red">
//           Can’t be empty
//         </span>
//       )}
//       <input
//         type="text"
//         name={name}
//         defaultValue={defaultValue}
//         placeholder={placeholder}
//         required={required}
//         className={clsx(
//           "w-full rounded-[4px] border border-medium-grey/25 py-2 pl-4 text-body-l",
//           {
//             "border-red pr-32": isInvalid,
//             "pr-4": !isInvalid,
//           }
//         )}
//       />
//     </div>
//   );
// };
import clsx from "clsx";

export const TextField = ({
  placeholder,
  isInvalid,
  name,
  required,
  defaultValue,
}) => {
  return (
    <div className="relative flex min-w-80 flex-1 items-center">
      {isInvalid && (
        <span className="absolute right-4 text-body-l text-red">
          Can’t be empty
        </span>
      )}
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={clsx(
          "focus:border-blue-500 w-full rounded-[4px] border py-2 pl-4 text-body-l focus:outline-none", // Added focus classes here
          {
            "border-red pr-32": isInvalid,
            "border-medium-grey/25 pr-4": !isInvalid, // Ensure proper default styling
          },
        )}
      />
    </div>
  );
};
