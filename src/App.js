import React, { useState } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');

  const addEvent = () => {
    if (title && datetime) {
      const newEvent = {
        id: Date.now(),
        title,
        datetime: new Date(datetime),
        created: new Date()
      };
      setEvents([newEvent, ...events]);
      setTitle('');
      setDatetime('');
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const formatDate = (date) => {
    return date.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="app">
      <h1 className="app-title"> Лента событий</h1>
      
      {/* Форма добавления */}
      <div className="event-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название события"
          className="input-title"
        />
        <input
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          className="input-datetime"
        />
        <button onClick={addEvent} className="btn-add">
          Добавить
        </button>
      </div>

      {/* Список событий */}
      <div className="events-container">
        {events.length === 0 ? (
          <p className="empty-message">
            Пока нет событий 
          </p>
        ) : (
          events.map(event => (
            <div key={event.id} className="event-item">
              <div className="event-info">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-datetime">
                   {formatDate(event.datetime)}
                </p>
                <p className="event-created">
                  Добавлено: {formatDate(event.created)}
                </p>
              </div>
              <button
                onClick={() => deleteEvent(event.id)}
                className="btn-delete"
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
