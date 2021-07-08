import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    Axios.post('http://localhost:3001/addfriend', {
      name: name,
      age: age,
    })
      .then(() => {
        setListOfFriends([...listOfFriends, { name: name, age: age }]);
        console.log('Friend Sent!');
      })
      .catch(() => {
        console.log('Could not add friend.');
      });
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/read')
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch(() => {
        console.log('Could not get friends');
      });
  }, []);

  return (
    <div className='App'>
      <div className='inputs'>
        <input
          type='text'
          placeholder='Friend name...'
          onChange={(event) => {
            setName(event.target.value);
            console.log(name);
          }}
        />
        <input
          type='number'
          placeholder='Friend age...'
          onChange={(event) => {
            setAge(event.target.value);
            console.log(age);
          }}
        />

        <button onClick={addFriend}>Add Friend</button>
      </div>
      <div className='listOfFriends'>
        {listOfFriends.map((val) => {
          console.log(val);
          return (
            <div className='friendContainer'>
              <div className='friend' key={val._id}>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
              </div>
              <button>Update</button>
              <button>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
