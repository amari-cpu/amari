import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import CreateProduct from './pages/CreateProduct'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import Test from './pages/Test'
import Cart from './pages/Cart'
// import Contact from './pages/Contact'
// import About from './pages/About'
// import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'
import Review from './pages/Review'
import BlogDetails from './pages/BlogDetails'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import ProductTable from './pages/ProductTable'
import EditProduct from './pages/EditProduct'
import CategoryTable from './pages/CategoryTable'
import CreateCategory from './pages/CreateCategory'
import EditCategory from './pages/EditCategory'
import BlogTable from './pages/BlogTable'
import EditBlog from './pages/EditBlog'
import CreatePost from './pages/CreatePost'
import Products from './pages/Products'
import Blogs from './pages/Blogs'
import ProtectedRoute from './context/ProtectedRoute'
import PromotionPage from './pages/PromotionPage'
import PromoSign from './pages/PromoSign'
import About from './pages/About'
import Contact from './pages/Contact'
import PurchaseTable from './pages/PurchaseTable'
import Author from './pages/Author'
import ForgotPassword from './pages/ForgotPassword'
import Register from './pages/Register'
import Profile from './pages/Profile'
import PopUp from './components/PopUp'
import FifteenPopup from './pages/FifteenPopup'
import Checkout from './pages/Checkout'
import ViewPurchase from './pages/ViewPurchase'
import { LGAList } from './pages/LGAList'
import { CreateLGA } from './pages/CreateLGA'
import { EditLGA } from './pages/EditLGA'
import AdminRegister from './pages/AdminRegister'
import TeamTable from './pages/TeamTable'








const App = () => {
  return (
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/test" element={<Test/>}/>
    <Route exact path="/createproduct" element={<CreateProduct/>}/>
    <Route exact path="/productdetails/:id" element={<ProductDetails/>}/>
    <Route exact path="/checkout" element={<Checkout/>}/>
    <Route exact path="/categories/:id" element={<Categories/>}/>
    <Route exact path="/products" element={<Products/>}/>
    <Route exact path="/blogs" element={<Blogs/>}/>
    <Route exact path="/cart" element={<Cart/>}/>
    <Route exact path="/login" element={<Login/>}/>
    <Route exact path="/register" element={<Register/>}/>
    <Route exact path="/forgotpassword" element={<ForgotPassword/>}/>
    <Route exact path="/profile" element={<Profile/>}/>
    <Route exact path="/adminregister" element={<AdminRegister/>}/>
    <Route exact path="/admin" element={<AdminLogin/>}/>
    <Route exact path="/review" element={<Review/>}/>
    <Route exact path="/blogdetails/:id" element={<BlogDetails/>}/>
    <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
    <Route exact path="/teamtable" element={<TeamTable />}/>
    <Route exact path="/producttable" element={<ProductTable />}/>
    <Route exact path="/purchasetable" element={<PurchaseTable />}/>

    <Route exact path="/lga" element={<LGAList />}/>
    <Route exact path="/createlga" element={<CreateLGA />}/>
    <Route exact path="/editlga/:id" element={<EditLGA />}/>



    <Route exact path="/viewpurchase/:id" element={<ViewPurchase />}/>
    <Route exact path="/editproduct/:id" element={<EditProduct />}/>
    <Route exact path="/categorytable" element={<CategoryTable />}/>
    <Route exact path="/editcategory/:id" element={<EditCategory />}/>
    <Route exact path="/createcategory" element={<CreateCategory/>}/>
    <Route exact path="/blogtable" element={<BlogTable />}/>
    <Route exact path="/editblog/:id" element={<EditBlog />}/>
    <Route exact path="/createpost" element={<CreatePost/>}/>
    <Route exact path="/promopage" element={<PromotionPage/>}/>
    <Route exact path="/promosign" element={<PromoSign/>}/>
    <Route exact path="/about" element={<About/>}/>
    <Route exact path="/contact" element={<Contact/>}/>
    <Route exact path="/author" element={<Author/>}/>
    <Route exact path="/popup" element={<PopUp/>}/>
    <Route exact path="/poptest" element={<FifteenPopup/>}/>
    
    {/* <Route exact path="/register" element={<Register/>}/>
    <Route exact path="/contact" element={<Contact/>}/>
 
    <Route exact path="/about" element={<About/>}/>
    <Route exact path="/payment" element={<Payment/>}/>
    <Route exact path="/shop" element={<Shop/>}/>
    <Route exact path="/productdetails" element={<ProductDetails/>}/>
    <Route exact path="/cart" element={<Cart/>}/>
    <Route exact path="/profile" element={<Profile/>}/> */}



    </Routes>
  )
}

export default App