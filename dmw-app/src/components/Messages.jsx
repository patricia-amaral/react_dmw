import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const token = localStorage.getItem('token');
  const url = "http://localhost:3000";

  const fetchMessages = async () => {
    const response = await axios.get(`${url}/mensagens`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(response.data);
  };

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      await axios.post(`${url}/mensagens`, { texto: newMessage }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewMessage('');
      fetchMessages();
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Digite sua mensagem" />
      <button onClick={sendMessage}>Enviar</button>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
             <strong>{msg.nome}:</strong> {msg.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}