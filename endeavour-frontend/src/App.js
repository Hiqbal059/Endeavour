import './App.css';
import Header from './Components/Header';
import Profile from './Components/Profile';
import { Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './Components/Review';
import PrimarySearchAppBar from './Components/Search';
import Investor from './Components/Dashboard_Investor';
import IdeaBrief from './Components/Idea_brief';
import InvestorMentor from './Components/Dashboard_Mentor'
import Entrepreneur from './Components/Dashboard_Entrepreneur'
import IdeasEntre from './Components/IdeasEntrepreneur';
import NewProject from './Components/Overview';
import DeniedIdea from './Components/Denied_Idea';
import FaqScreen from './Components/FAQ';
import Payment from './Components/Payment';
import JoinWorkShop from './Components/JoinWorkShop';
import EditProfile from './Components/EditProfile';
import CreateWorkshop from './Components/CreateWorkshop';
import Message from './Components/Message/'
import Workshops from './Components/workshops'
import Chat from './Components/chat';
function App() {

  return (
    <div className="App">
        <Routes>
          <Route path='/' exact element={<Header />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/review/:id" element={<ResponsiveAppBar />} />
          <Route path='/ideas' element={<PrimarySearchAppBar />} />
          <Route path='/investor' element={<Investor />} />
          <Route path='/ideabrief' element={<IdeaBrief />} />
          <Route path='/mentor' element={<InvestorMentor /> } />
          <Route path='/entrepreneur' element={<Entrepreneur />} />
          <Route path='/ideasentre' element={<IdeasEntre />} />
          <Route path='/newproject' element={<NewProject />} />
          <Route path='/denied' element={<DeniedIdea />} />
          <Route path='/faq' element={<FaqScreen />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/join/:id' element={<JoinWorkShop />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/create-workshop' element={<CreateWorkshop />} />
          <Route path="/message" element={<Message />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
    </div>
  );
}

export default App;
