import { Link } from 'react-router-dom';

function Landing({users, setCurrentUserIndex}) {

    return (<>
        <h1 class="header1">Who's watching?</h1>
        <div className='users-container'>
            {users.map((user, index) =>
                <div key={index} className="uber-box" 
                    style={{backgroundColor: user.color}} 
                    onClick={() => setCurrentUserIndex(index)}>  
                    <Link to="/catalog" >
                        <div className='user-box'>
                            {user.name}
                        </div>
                    </Link>
                </div>
            )} 
        </div>
        </>); 
}

export default Landing;