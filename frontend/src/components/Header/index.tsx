import FuriaLogo from'../../assets/Furia_Esports_logo.png'
import FuriaLogoBranca from '../../assets/furiabranco.png'
import FuriaLogoPreta from '../../assets/furia.png'
import SetThemeIcon from '../setThemeIcon'
import './style.css'

type HeaderProps = {
    onChange: () => void,
    backgroundColor: string,
    isDarkMode: boolean
}

const Header = ({onChange, backgroundColor, isDarkMode}: HeaderProps) => {

  function setLogo(isDark: boolean) {
    if (isDark) {
      return FuriaLogoBranca
    } else {
      return FuriaLogoPreta
    }
  }

    return (
      <header className="header" style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'inherit', // Herda o background do container
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        backdropFilter: 'blur(10px)',
      }}>
        <img className="furia-logo" src={FuriaLogo} alt="Furia-Logo" style={{ height: '40px' }}/>
        <img className="furia-logo-branca" src={setLogo(isDarkMode)} alt="Furia-Logo" style={{ width: '85px' }}/>
        <SetThemeIcon onChange={onChange}/>
      </header>
    );
};

export default Header;