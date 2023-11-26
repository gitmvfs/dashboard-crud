import CardContagem from "../../components/card/card_contagem";
import "./main.css"


const Main = () => {

return(

    <>

        <div id="butoes-novos-div">
            
            <button id="categoriaFormulario">+ CATEGORIA </button>
            <button id="produtoFormulario">+ PRODUTO </button>
            
        </div>
        <div id="estatisticas-div">
            
            <div className="organizar-estatisticas">
                
                <CardContagem titulo="Contagem produtos" contagem="20000"/>
                <CardContagem titulo="Contagem coleções" contagem="300"> </CardContagem>
            
            </div>

            <div className="organizar-estatisticas-genero">
                <CardContagem titulo="Feminino" contagem="300"> </CardContagem>
                <CardContagem titulo="Unissex" contagem="300"> </CardContagem>
                <CardContagem titulo="Masculino" contagem="300"> </CardContagem>
            </div>

        </div>


    </>

)

}


export default Main;