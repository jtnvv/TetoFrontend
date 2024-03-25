import Footer from "./footer"
import Header from "./header"

const Layout =({children})=>{
    return(
        <div className="flex flex-col justify-between h-screen w-screen">
            <Header />
            <div className="h-full">{children}</div>
            <Footer />
        </div>
    )
}

export default Layout