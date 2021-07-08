import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    Axios.post('http://localhost:3001/addfriend', { name: name, age: age })
      .then(() => {
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
      {listOfFriends.map((val) => {
        console.log(val);
        return (
          <div key={val._id}>
            {val.name} {val.age}
          </div>
        );
      })}
    </div>
  );
}

export default App;
