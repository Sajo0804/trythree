import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css'

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
  
    useEffect(() => {
      fetch('https://potterhead-api.vercel.app/api/characters')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setCharacters(data);
          setLoading(false);
        })
        .catch(error => {
          setError('Kunde inte hämta karaktärer.');
          setLoading(false);
        });
    }, []);
  
    const charactersPerPage = 10;
    const totalPages = Math.ceil(characters.length / charactersPerPage);
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    if (loading) return <div>Läser in karaktärer...</div>;
    if (error) return <div>{error}</div>;
  
    const visibleCharacters = characters.slice((currentPage - 1) * charactersPerPage, currentPage * charactersPerPage);
  
    return (
      <>
        <div>
          <h2>Karaktärer</h2>
          <ul style={{ listStyleType: 'none' }}>
            {visibleCharacters.map((character) => (
              <li key={character.id} style={{ listStyleType: 'none' }}>
                {character.name} - {character.house}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Föregående</button>
          <span>Sida {currentPage} av {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Nästa</button>
        </div>
      </>
    );
  };
  
  export default CharacterList;
  


// const CharacterList = () => {
//   const [characters, setCharacters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('https://potterhead-api.vercel.app/api/characters')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setCharacters(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError('Kunde inte hämta karaktärer.');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Läser in karaktärer...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <><div><h2>Karaktärer</h2></div>
//     <ul style={{ listStyleType: 'none' }}>
//     {characters.map((character) => (
//       <li key={character.id} style={{ listStyleType: 'none' }}>
//         {character.name} - {character.house}
//       </li>
//     ))}
//   </ul>
//   </>
//   );
// };

// export default CharacterList;
