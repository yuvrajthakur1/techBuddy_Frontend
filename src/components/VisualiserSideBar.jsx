import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VisualiserSidebarItem({ title, options}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mb-2">
      {/* Parent Item */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
      >
        {title}
      </button>

      {/* Sub Items */}
      {open && (
        <ul className="mt-1 ml-4 bg-gray-700 rounded-lg">
          {options.map((opt, i) => (
            <li
              onClick={()=>{
                setOpen(!open);
                navigate(`/dsavisualiser/${title}/${opt}`);
              }}
              key={i}
              className="px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 cursor-pointer"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
