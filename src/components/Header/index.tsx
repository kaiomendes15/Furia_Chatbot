import FuriaLogo from'../../assets/Furia_Esports_logo.png'
import SetThemeIcon from '../setThemeIcon'
import './style.css'

type HeaderProps = {
    onChange: () => void
}

const Header = ({onChange}: HeaderProps) => {
    
    

    return (
        <header>
            <img className="furia-logo"src={FuriaLogo} alt="Furia-Logo"/>
            <SetThemeIcon onChange={onChange}/>
        </header>
    );
};

export default Header;