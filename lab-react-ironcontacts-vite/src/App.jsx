import { useState } from "react";
import "./App.css"
import contactsData from './contacts.json'
import { getRandomContact } from "./utils/contacts.utils";

function App() {

  const [contacts, setContacts] = useState(contactsData.slice(0, 10))
  const [contactsBackup, setContactsBackup] = useState(contactsData.slice(0, 10))

  const addRandomContact = () => {
    const randomContact = getRandomContact(contactsData)
    const isRepeated = contacts.some(elm => elm.id === randomContact.id)

    if (!isRepeated) {
      setContacts([randomContact, ...contacts])
      setContactsBackup([randomContact, ...contacts])
    } else addRandomContact()
  }

  const sortByPopularity = () => {
    const contactsCopy = [...contacts]
    const sortedContacts = contactsCopy.sort((a, b) => a.popularity - b.popularity)
    setContacts(sortedContacts)
  }

  const filterByOscar = () => {
    const oscarFiltered = contactsBackup.filter(elm => elm.wonOscar)
    setContacts(oscarFiltered)
  }

  const filterByEmmy = () => {
    const emmyFiltered = contactsBackup.filter(elm => elm.wonEmmy)
    setContacts(emmyFiltered)
  }

  return (
    <div className="App">

      <h1>LAB | React IronContacts</h1>

      <hr />

      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <button onClick={filterByOscar}>See only Oscar awarded</button>
      <button onClick={filterByEmmy}>See only Emmy awarded</button>

      <hr />

      <table>
        <thead>
          <tr>
            <th >Name</th>
            <th >Picture</th>
            <th >Popularity</th>
            <th >Won an Oscar</th>
            <th >Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {
            contacts.map(elm => {
              return (
                <tr key={elm.id}>
                  <td>{elm.name}</td>
                  <td><img src={elm.pictureUrl} alt={elm.name} /></td>
                  <td>{elm.popularity}</td>
                  <td>{elm.wonOscar && '🏆'}</td>
                  <td>{elm.wonEmmy && '🌟'}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>
  )
}

export default App;
