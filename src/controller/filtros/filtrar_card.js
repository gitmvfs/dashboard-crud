export default function FiltrarCards(valorInput,data,setDataFiltro){

    const dadosFiltrados = valorInput.trim() !== "" 
    ? data.filter(props => props.nome.includes(valorInput.trim()))
    : data;
    setDataFiltro(dadosFiltrados)
}