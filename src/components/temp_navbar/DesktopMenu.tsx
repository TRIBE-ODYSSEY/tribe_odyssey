// import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
// import { NavLink } from '@src/types';
// import { useNavigate } from 'react-router-dom';
// import { NAV_ITEMS } from './Header';
// import { GradientText } from './StyledComponents';

// interface MenuProps {
//   navMenuAnchors: (HTMLElement | null)[];
//   onNavMenuOpen: (event: React.MouseEvent<HTMLElement>, index: number) => void;
//   onNavMenuClose: (index: number) => void;
// }

// export const Menu: React.FC<MenuProps> = ({
//   navMenuAnchors,
//   onNavMenuOpen,
//   onNavMenuClose,
// }) => {
//   const navigate = useNavigate();

//   const handleMenuItemClick = (link: NavLink, index: number) => {
//     onNavMenuClose(index);
//     if (link.external) {
//       window.open(link.path, '_blank', 'noopener,noreferrer');
//     } else {
//       navigate(link.path);
//     }
//   };

//   return (
//     <div className="flex space-x-2 items-center h-full ml-2">
//       {NAV_ITEMS.map((item, index) => (
//         <div key={item.text} className="relative">
//           <button
//             onClick={(e) => onNavMenuOpen(e, index)}
//             className="flex items-center justify-center gap-1 min-w-[120px] h-10 px-4 border border-white border-opacity-10 rounded cursor-pointer transition transform hover:-translate-y-0.5 hover:border-opacity-20"
//           >
//             <GradientText className="text-body2">{item.text}</GradientText>
//             <ArrowDropDownIcon className="transition-transform duration-300" />
//           </button>

//           {navMenuAnchors[index] && (
//             <div
//               className="absolute mt-2 w-40 bg-[#14121b] rounded-lg border border-white border-opacity-10 backdrop-blur-lg shadow-lg"
//               style={{
//                 top: '100%',
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//               }}
//             >
//               <ul className="p-2">
//                 {item.links.map((link) => (
//                   <li
//                     key={link.name}
//                     onClick={() => handleMenuItemClick(link, index)}
//                     className="rounded-md px-4 py-2 transition transform hover:bg-white/5 hover:translate-x-1 cursor-pointer"
//                   >
//                     <GradientText className="flex items-center">
//                       {link.name}
//                       {link.external && (
//                         <span className="ml-1 text-sm opacity-70">↗</span>
//                       )}
//                     </GradientText>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };
