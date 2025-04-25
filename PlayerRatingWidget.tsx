
import { useState } from 'react';

const initialPlayers = [
  { id: 1, name: 'Franco Armani' },
  { id: 2, name: 'Enzo Díaz' },
  { id: 3, name: 'Ignacio Fernández' }
];

const initialMatches = [
  { id: 1, name: 'River vs Boca', tournament: 'Copa de la Liga' },
  { id: 2, name: 'River vs Racing', tournament: 'Liga Profesional' }
];

export default function PlayerRatingWidget() {
  const [players, setPlayers] = useState(initialPlayers);
  const [matches, setMatches] = useState(initialMatches);
  const [newPlayer, setNewPlayer] = useState('');
  const [newMatch, setNewMatch] = useState({ name: '', tournament: '' });
  const [selectedMatchId, setSelectedMatchId] = useState('');
  const [ratings, setRatings] = useState({});
  const [view, setView] = useState('vote');

  const selectedMatch = matches.find((m) => m.id.toString() === selectedMatchId);

  const handleRate = (playerId, value) => {
    setRatings({ ...ratings, [playerId]: value });
  };

  const submitVotes = () => {
    alert('¡Gracias por votar!');
    console.log({ matchId: selectedMatch?.id, ratings });
    setRatings({});
    setSelectedMatchId('');
  };

  const addPlayer = () => {
    if (newPlayer.trim()) {
      setPlayers([...players, { id: Date.now(), name: newPlayer.trim() }]);
      setNewPlayer('');
    }
  };

  const addMatch = () => {
    if (newMatch.name && newMatch.tournament) {
      setMatches([...matches, { id: Date.now(), ...newMatch }]);
      setNewMatch({ name: '', tournament: '' });
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', fontFamily: 'sans-serif', padding: 16 }}>
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <button onClick={() => setView('vote')} style={{ marginRight: 8 }}>Votar</button>
        <button onClick={() => setView('admin')}>ABM</button>
      </div>

      {view === 'vote' && (
        <div>
          <select value={selectedMatchId} onChange={(e) => setSelectedMatchId(e.target.value)} style={{ width: '100%', padding: 8 }}>
            <option value="">Elegí un partido</option>
            {matches.map((match) => (
              <option key={match.id} value={match.id}>{match.name} ({match.tournament})</option>
            ))}
          </select>

          {selectedMatch && (
            <div style={{ marginTop: 16 }}>
              {players.map((player) => (
                <div key={player.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
                  <span>{player.name}</span>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={ratings[player.id] || ''}
                    onChange={(e) => handleRate(player.id, parseInt(e.target.value))}
                    style={{ width: 50, textAlign: 'center' }}
                  />
                </div>
              ))}
              <button onClick={submitVotes} style={{ marginTop: 16, width: '100%', backgroundColor: '#c00', color: 'white', padding: 10, border: 'none', borderRadius: 4 }}>Enviar Votación</button>
            </div>
          )}
        </div>
      )}

      {view === 'admin' && (
        <div style={{ marginTop: 16 }}>
          <h3>Agregar jugador</h3>
          <input
            type="text"
            placeholder="Nombre del jugador"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 8 }}
          />
          <button onClick={addPlayer} style={{ marginBottom: 16, width: '100%', backgroundColor: '#c00', color: 'white', padding: 10, border: 'none', borderRadius: 4 }}>Agregar jugador</button>

          <h3>Agregar partido</h3>
          <input
            type="text"
            placeholder="Nombre del partido"
            value={newMatch.name}
            onChange={(e) => setNewMatch({ ...newMatch, name: e.target.value })}
            style={{ width: '100%', padding: 8, marginBottom: 8 }}
          />
          <input
            type="text"
            placeholder="Nombre del torneo"
            value={newMatch.tournament}
            onChange={(e) => setNewMatch({ ...newMatch, tournament: e.target.value })}
            style={{ width: '100%', padding: 8, marginBottom: 8 }}
          />
          <button onClick={addMatch} style={{ width: '100%', backgroundColor: '#c00', color: 'white', padding: 10, border: 'none', borderRadius: 4 }}>Agregar partido</button>
        </div>
      )}
    </div>
  );
}
