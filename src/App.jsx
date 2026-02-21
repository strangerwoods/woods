import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import Post from "./components/Post";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="posts/:year/:month/:day" element={<Post />} />
			</Route>
		</Routes>
	);
}

export default App;
