import { useDarkMode } from '../../contexts/DarkModeContext';
import './style.css'
import { MdSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";

type SetThemeIconProps = {
    onChange: React.MouseEventHandler<HTMLButtonElement>
}
const SetThemeIcon = ({onChange}: SetThemeIconProps) => {
  const { darkMode } = useDarkMode()

  function setIcon() {
    return darkMode ? <MdSunny size={30}/> : <BsFillMoonStarsFill size={30}/>
  }
  return (
    <button className="toogleColorMode" onClick={onChange}>
      {setIcon()}
    </button>
  )
}



export default SetThemeIcon
