import { Link } from 'react-router-dom'
import './index.css'
import { motion } from 'framer-motion'
import principal from './assets/principal.jpg'
import { useState } from 'react'

const WelcomeScreen = () => {
    function nextRoute() {
        setStartIcon(false)
        setTimeout(()=> {
            setStartIcon(true)
        },1000)
    }

const[ showStartIcon, setStartIcon] = useState(true);

return(
    <>
    <motion.section initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity:0, transition: {duration: 1}}} className='welcome-screen' hidden={!showStartIcon}>
        <h1 className="main-header">TIC TAC TOE</h1>
        <Link to="/start"><button className="start-button" onClick={nextRoute}>Start</button></Link>
 
    </motion.section>
    <img id='start-icon' hidden={showStartIcon} alt="scaled pumpink" src={principal}/>
           </>
)
}




export default WelcomeScreen

