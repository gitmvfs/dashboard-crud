import React from 'react';
import "./card_contagem.css"

const CardContagem = ({ titulo, contagem }) => {
  return (
    <div className="card-contagem">
    
        <center>
            
            <h3 className='h3'>{titulo}</h3>

            <h1 className='h1'>{contagem}</h1>

        </center>
    
    
    </div>
  );
}

export default CardContagem;
