import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Publish from "./pages/Publish";

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Signin />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/signin' element={<Signin />} />
				<Route path='/blogs' element={<Blogs />} />
				<Route path='/blog/:id' element={<Blog />} />
				<Route path='/publish' element={<Publish />} />
			</Routes>
		</Router>
	);
}

export default App;
