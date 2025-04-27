import FuriaLogo from'../../assets/Furia_Esports_logo.png'
import SetThemeIcon from '../setThemeIcon'
import './style.css'

type HeaderProps = {
    onChange: () => void,
    backgroundColor: string,
}

const Header = ({onChange, backgroundColor}: HeaderProps) => {
    return (
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'inherit', // Herda o background do container
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: backgroundColor
      }}>
        <img className="furia-logo" src={FuriaLogo} alt="Furia-Logo" style={{ height: '40px' }}/>
        <SetThemeIcon onChange={onChange}/>
      </header>
    );
};

export default Header;