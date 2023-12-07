import './main.css'

import Navbar from '../../components/layout/switchNav'
import BannerComponent from '../../components/layout/banner/banner'
import CardCategoria from '../../components/cardCategoria/cardCategoria'
import CardProduto from '../../components/cardProduto/cardProduto'
import { Fade } from 'react-awesome-reveal'
const MainView = () =>{



    return(
        <>

        <Navbar/>
      <Fade delay={1e2} cascade damping={1e-1} direction='down'  triggerOnce="true">

        <BannerComponent/>
        <CardCategoria/>
        </Fade>
        <Fade delay={1e2} cascade damping={1e-1} direction='down'  triggerOnce="true" >
        <CardProduto/>
        </Fade>

        </>
    )
}



export default MainView