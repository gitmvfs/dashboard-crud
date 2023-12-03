import "./headerDesktop.css";

export default function Header (){
    return(
        <div className="Background">
            <div className="teste">
                <form className="formhed">
                    <input id="procura" type="text" placeholder="procurar" className="input-icon" />
                </form>
            </div>
            <div className="hh1">
                <p>ethereal club</p>
            </div>
            <center>
                <div className="linha"></div>
                <div className="marcafiltro"></div>
                <div className="linha"></div>
            </center>

        </div>

    )
}