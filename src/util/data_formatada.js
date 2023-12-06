function formatDate(dateString) {
    // Convertendo a string da data para um objeto Date
    const dateObject = new Date(dateString);
  
    // Obtendo os componentes da data
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // adicionando zero à esquerda, se necessário
    const day = String(dateObject.getDate()).padStart(2, '0'); // adicionando zero à esquerda, se necessário
  
    // Formatando a data no padrão "yyyy-mm-dd"
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }
  
  function formatarDataBr(dataISO8601) {
    // Criar um objeto de data a partir da string
    const data = new Date(dataISO8601);

    // Obter dia, mês e ano
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const ano = data.getFullYear();

    // Criar a string no formato brasileiro
    const dataBrasileira = `${dia}-${mes}-${ano}`;

    return dataBrasileira;
}

module.exports = {formatDate, formatarDataBr}