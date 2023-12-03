import "./headerSemFiltro.css"
import volta from "../../../images/icons/arrow-left.svg"

export default function Header (){
    return(
        <div className="Background">
            <a href="/"><img id="seta" src={volta} alt="voltar"/></a>
            <p>ethereal club</p>
            <div className="linha"></div>
            <div className="marcafiltro"></div>
            <div className="linha"></div>
        </div>
    )
}