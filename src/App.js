import './App.css';
import HomePage from './pages/homePage';
import Sidebar from './components/Sidebar';
import {  Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './components/bookComponents/BookList';
import PublisherList from './components/publisherComponents/PublisherList';
import AuthorList from './components/authorComponents/AuthorList';
import GenreList from './components/genreComponents/GenreList';
import MemberList from './components/memberComponents/MemberList';
import BorrowedBookList from './components/borrowedBookComponents/BorrowedBookList';
import AuthorAdd from './components/authorComponents/AuthorAdd';
import GenreAdd from './components/genreComponents/GenreAdd';
import GenreDetail from './components/genreComponents/GenreDetail';
import PublisherAdd from './components/publisherComponents/PublisherAdd';
import BookDetail from './components/bookComponents/BookDetail';
import BookAdd from './components/bookComponents/BookAdd';
import MemberAdd from './components/memberComponents/MemberAdd';
import MemberDetail from './components/memberComponents/MemberDetail';
import AuthorsBooks from './components/authorComponents/AuthorsBooks';
import GenresBooks from './components/genreComponents/GenresBooks';
import PublishersBooks from './components/publisherComponents/PublishersBooks';
import MemberDeleted from './components/memberComponents/MemberDeleted';
import BorrowedBookAdd from './components/borrowedBookComponents/BorrowedBookAdd';
import ReturnedBookList from './components/borrowedBookComponents/ReturnedBookList';
import MemberConfirmation from './components/memberComponents/MemberConfirmation';
import PublisherDetail from './components/publisherComponents/PublisherDetail';
import AuthorDetail from './components/authorComponents/AuthorDetail';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Navbar/>
    <div className="container">
    <div className="navbar">
      <Sidebar/>
    </div>
    <div className="menu">
      {/* <BrowserRouter> */}
      <Routes>

        <Route path="/" element={<HomePage/>}/>
        <Route path="/books" element={<BookList/>}/>  
        <Route path="/add-book" element={<BookAdd/>}/>  
        <Route path="/book-detail/:id" element={<BookDetail/>}/>  
        <Route path="/publishers" element={<PublisherList/>}/>    
        <Route path="/add-publisher" element={<PublisherAdd/>}/>
        <Route path="/publishersbooks/:id" element={<PublishersBooks/>}/>    
        <Route path="/publisher-details/:id" element={<PublisherDetail/>}/>    
        <Route path="/authors" element={<AuthorList/>}/>
        <Route path="/add-author" element={<AuthorAdd/>}/>
        <Route path="/author-details/:id" element={<AuthorDetail/>}/>
        <Route path="/authorsbooks/:id" element={<AuthorsBooks/>}/>
        <Route path="/genres" element={<GenreList/>}/>
        <Route path="/add-genre" element={<GenreAdd/>}/>
        <Route path="/genresbooks/:id" element={<GenresBooks/>}/>
        <Route path="/genre-details/:id" element={<GenreDetail/>}/>
        <Route path="/members" element={<MemberList/>}/>
        <Route path="/deleted-member" element={<MemberDeleted/>}/>
        <Route path="/add-member" element={<MemberAdd/>}/>
        <Route path="/member-detail/:id" element={<MemberDetail/>}/>
        <Route path="/memberconfirmation" element={<MemberConfirmation/>}/>
        <Route path="/borrowedbooks" element={<BorrowedBookList/>}/>
        <Route path="/returnedbooks" element={<ReturnedBookList/>}/>
        <Route path="/add-borrowedbook/:id/:name" element={<BorrowedBookAdd/>}/>

      </Routes>
    </div>
  </div>
  <Footer/>
    </div>
  );
}

export default App;
