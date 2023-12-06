import './main.css'

import Navbar from '../../components/layout/switchNav'
import BannerComponent from '../../components/layout/banner/banner'
import CardCategoria from '../../components/cardCategoria/cardCategoria'
import CardProduto from '../../components/cardProduto/cardProduto'
const MainView = () =>{



    return(
        <>
        <Navbar/>
        <BannerComponent/>
        <CardCategoria/>
        <CardProduto/>
        
        </>
    )
}



export default MainView