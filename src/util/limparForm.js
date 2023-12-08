/// retirar o window.reload colocar o limpar e fé


const LimparFormularioCategoria = (setCategoria) =>{
 
    setCategoria({
    nome: "",
    dataInicio: "",
    dataFinal: "2024-02-11",
    descricao: "",
    foto: [],
    })
}
 
const LimparFormularioProduto = (nome,preco,genero,descricao,tamanho,cor,tipo,categoria,fotos) =>{
 
    nome("")
    tamanho([])
    preco("")
    cor("")
    genero({value:"feminino" , label : "Feminino"})
    tipo({value:"blazer" , label : "Blazer"})
    fotos([])
    descricao("")
    categoria("")
 
 
}
 
module.exports = {LimparFormularioCategoria, LimparFormularioProduto}