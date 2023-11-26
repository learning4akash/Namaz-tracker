
import './App.css'
import Setting from './Setting';
const App = () => (

    <div>
       <div className='topbar-content'>
          <div></div>
          <div>
            <h1><a href='/'>Namaz tracker</a></h1>
          </div>
          <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' className='user-pic' />
       </div> 
        
        <hr />

       <nav>
        <div></div>
        <div>
          <ul>
            <li><a href='#'>Dashboard</a></li>
            <li><a href='#'>Today</a></li>
            <li><a href='#'>Setting</a></li>
          </ul>
        </div>
        <div></div>
       </nav> <hr />

       <Setting />

    </div>
);

export default App;