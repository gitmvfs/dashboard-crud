import CardContagem from "../../components/card/card_contagem";
import "./main.css"
import CardCategoria from "../../components/cardCategoria/cardCategoria";
import Header from "../../components/layout/header/headerDesktop";

const Main = () => {

return(

    <>
        <Header/>
        <div className="container">
            
        <div className="body-dash">
            

            <div id="butoes-novos-div">
                
            <a href="/categoria/cadastro"> <button id="categoriaFormulario" >+ CATEGORIA </button> </a>
            <a href="/produto/cadastro"> <button id="produtoFormulario">+ PRODUTO </button></a>
            
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
            <hr className="separacao-div"></hr>
            <center>
            <h1>Categorias</h1>
            </center>

            <div id="categorias-div">

                <CardCategoria/>
                
            </div>
        </div>
        </div>
        
    </>

)

}


export default Main;