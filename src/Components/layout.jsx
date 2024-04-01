import Footer from "./footer"
import Header from "./header"

const Layout =({children})=>{
    return(
        <div className="flex flex-col justify-between h-screen w-screen">
            <Header />
            <div className="bg-brand-1 text-brand-6">{children}</div>
            <Footer />
        </div>
    )
}

export default Layout