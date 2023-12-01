import delete_icon from "../../images/icons/cardProduto/delete.svg"
import edit_icon from "../../images/icons/cardProduto/edit.svg"
import view_icon from "../../images/icons/cardProduto/view.svg"
import './cardCategoria.css'
import { useState, useEffect } from 'react';
import FiltrarCards from '../../controller/filtrar_card';
import LimparFiltro from '../../controller/limpar_filtro';
import axios from "axios"

const confirmarDelete = (id) => {
  // Lógica para confirmar a exclusão
  console.log(`Excluir produto com ID ${id}`);
}



function CardCategoria(){

    
    // Guarda os valores do array gerado pela API
    const [data, setData] = useState([])

    //Guarda os valores do input Filtro
    const [valorInput, setValorInput] = useState("");

    //Guarda a nova lista (caso filtrada)
    const [dataFiltro,setDataFiltro] = useState([])
    
    //Define o valor do input Filtro 
    const handleInputChange = (event) => {
        setValorInput(event.target.value)
        
      };

    // Antes do site carregar ele faz uma requisição para a api
    useEffect(() => {
        axios.get('http://localhost:3000/categoria')
          .then(async(res) => {
            await setData(res.data) // Caso a requisição tenha dado certo ele guarda no data
            await setDataFiltro(res.data)
            console.log(res.data)   // Testa no console a resposta da api
          })
        .catch(err => alert("Erro inesperado: " + err))   // Caso tenha gerado algum erro no processo ele da um alerta com o erro
      }, [])


    // Parte que vai ser renderizada
    return(
        
    <div className='filtro-div'>
        <center className='mt-5'>
        <input
            type="text"
            value={valorInput}
            onInput={handleInputChange}
            placeholder='Digite o nome da categoria'
        />
        
       <button onClick={ () => FiltrarCards(valorInput,valorInput,data,setDataFiltro)} placeholder='Digite o nome'>Filtrar</button>
       <button onClick={ () => LimparFiltro(setValorInput,setDataFiltro,data)} placeholder='Digite o nome'>Limpar Filtro</button>
       </center>
    <div className='card-div'>
    {
    dataFiltro
    .map(props =>( 
    <div className='card-container'>
         

  
        <div>
            <h1>{props.nome}</h1>
        </div>
      

        <div className="opcoes-categoria">
       
       <a href={`/produto/visualizar/${props.index}`}>
         <img src={view_icon} alt="Visualizar" />
       </a>
      
       <a href={`/produto/editar/${props.index}`}>
         <img src={edit_icon} alt="Editar" />
       </a>
       
       <img
         onClick={() => confirmarDelete(props.index)}
         src={delete_icon}
         alt="Excluir"
       />
   
     </div>
        
       

    </div>
    ) ) }
    </div> 
</div>  
)  
}

export default CardCategoria