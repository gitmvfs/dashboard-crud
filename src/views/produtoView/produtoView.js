import "./produtoView.css"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

const ProdutoView = () =>{
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://api-crud-ecommerce.cyclic.app/produto/' + id);
          setData(response.data);
        } catch (error) {
          console.error('Erro na requisição:', error);
        } finally {
          // Independentemente de sucesso ou falha, a requisição terminou
          setLoading(false);
        }
      };
  
      fetchData(); // Chama a função para iniciar a requisição
  
      // O retorno desta função é chamado ao desmontar o componente (efeito de limpeza)
      return () => {
        // Adicione lógica de limpeza, se necessário
      };
    }, []); // O segundo argumento, uma matriz vazia [], garante que o efeito só seja executado uma vez (equivalente a componentDidMount)
  
    if (loading) {
      return <p>Carregando...</p>;
    }
  
    return (
      <>
      <h1>{id}</h1>
        {/* Renderize seus dados aqui */}
        {data && (
          <div id="produto-div">
            
            <div className="imagens">

                <img src={data.linkFoto1} alt="Imagem do produto"/>
                <img src={data.linkFoto2} alt="Imagem do produto"/>
                <img src={data.linkFoto3} alt="Imagem do produto"/>

            </div>
            <div className="informacoes-produto">
               
                <h1>{data.nome}</h1>
                <h1>{data.preco}</h1>
                <h1>{data.tamanhos}</h1>
                <h1>{data.cor}</h1>
                <p>{data.descricao}</p>
        
            </div>
         
            {/* Outros elementos... */}
          </div>
        )}
      </>
    );
  
}

export default ProdutoView