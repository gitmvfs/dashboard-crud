import delete_icon from "../../images/icons/cardProduto/delete.svg"
import edit_icon from "../../images/icons/cardProduto/edit.svg"
import view_icon from "../../images/icons/cardProduto/view.svg"

const confirmarDelete = (id) => {
  // Lógica para confirmar a exclusão
  console.log(`Excluir produto com ID ${id}`);
}

const CardProduto = ({ image, nome, categoria, preco, id }) => {
  return (
   
   <div className="card-produto">
     
      <img
        src={image}
        alt={`Imagem produto ${nome}`}
      />
      
      <h3>{categoria}</h3>
      <h3>{preco}</h3>
      
      <div className="opcoes-produto">
       
        <a href={`/produto/visualizar/${id}`}>
          <img src={view_icon} alt="Visualizar" />
        </a>
       
        <a href={`/produto/editar/${id}`}>
          <img src={edit_icon} alt="Editar" />
        </a>
        
        <img
          onClick={() => confirmarDelete(id)}
          src={delete_icon}
          alt="Excluir"
        />
    
      </div>
    </div>
  );
}

export default CardProduto;