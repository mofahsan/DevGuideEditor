// import { useState } from "react";

// /**
//  * A custom React hook that tracks the hover state of a component.
//  * 
//  * @returns {Array} A tuple containing:
//  * - `isHovered`: A boolean indicating if the element is currently hovered.
//  * - `bind`: An object with `onMouseEnter` and `onMouseLeave` event handlers to control the hover state.
//  */
// const useHover = () => {
//   console.log("useHover hook being used")
  
//   // State to track if the element is hovered
//   const [isHovered, setIsHovered] = useState(false);

//   // Event handlers to set and unset the hover state
//   const bind = {
//     onMouseEnter: () => setIsHovered(true),
//     onMouseLeave: () => setIsHovered(false),
//   };

//   // Return the hover state and the binding object for event handlers
//   return [isHovered, bind];
// };

// export default useHover;
