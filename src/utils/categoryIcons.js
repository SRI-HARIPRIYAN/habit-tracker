import { FaRegHeart, FaRegSmile, FaRegStar } from "react-icons/fa";
import { FaGlassWater } from "react-icons/fa6";
import { IoMusicalNotes, IoSunnySharp } from "react-icons/io5";
import { FiMoon } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";
import { GoGoal } from "react-icons/go";

export const categoryIcons = {
  Create: IoMusicalNotes,
  Focus: AiFillThunderbolt,
  Goals: GoGoal,
  Hydrate: FaGlassWater,
  Learn: IoBookOutline,
  Mind: FiMoon,
  Morning: IoSunnySharp,
  Other: FaRegStar,
  Social: FaRegSmile,
  Work: MdOutlineWorkOutline,
  Health: FaRegHeart,
};

export const categoryColors = {
  Create: "violet", // IoMusicalNotes
  Focus: "red", // AiFillThunderbolt
  Goals: "green", // GoGoal
  Hydrate: "blue", // FaGlassWater
  Learn: "purple", // IoBookOutline
  Mind: "indigo", // FiMoon
  Morning: "yellow", // IoSunnySharp
  Other: "gray", // FaRegStar
  Social: "pink", // FaRegSmile
  Work: "teal", // MdOutlineWorkOutline
  Health: "orange", // FaRegHeart
};
