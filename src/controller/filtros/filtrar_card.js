export default function FiltrarCards(valor,valorInput,data,setDataFiltro){

    const dadosFiltrados = valorInput.trim() !== "" 
    ? data.filter(props => props.nome.includes(valorInput.trim()))
    : data;
    setDataFiltro(dadosFiltrados)
    console.log(valor)
}