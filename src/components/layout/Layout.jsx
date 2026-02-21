import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
	return (
		<>
			<div className='bg-black min-h-screen text-white flex'>
				<Sidebar />
				<main>{children}</main>
			</div>
		</>
	)
}

export default Layout;
