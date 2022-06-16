import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Game from "./GameScreen";

import WelcomeScreen from "./WelcomeScreen";

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
        <Route index  element={<WelcomeScreen />}/>
        <Route path='/start' element={<Game />}/>
        </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes