// ✅ Updated Full AdminChat.jsx (with robust Firestore fetching)

import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';
import { jwtDecode } from 'jwt-decode';

export default function AdminChat() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // 🔍 Fetch chat users (document IDs in 'chats' collection)
  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'chats'));
      const usersList = snapshot.docs.map(doc => ({ id: doc.id }));
      console.log('✅ Users found:', usersList);
      setUsers(usersList);
    } catch (err) {
      console.error('❌ Failed to fetch users:', err);
    }
  };

  // 📩 Fetch messages of selected user
  const loadMessages = (userId) => {
    const q = query(
      collection(db, 'chats', userId, 'messages'),
      orderBy('sentAt')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messageList);
      console.log(`💬 Messages loaded for ${userId}:`, messageList);
    });

    return unsubscribe;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUserId) return;
    const unsubscribe = loadMessages(selectedUserId);
    return () => unsubscribe();
  }, [selectedUserId]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUserId) return;

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    try {
      await addDoc(collection(db, 'chats', selectedUserId, 'messages'), {
        senderId: decoded.id,
        content: newMessage,
        sentAt: serverTimestamp()
      });
      setNewMessage('');
    } catch (err) {
      console.error('❌ Failed to send message:', err);
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto mt-6 h-[80vh]">
      {/* Sidebar */}
      <div className="w-1/4 border-r overflow-y-auto">
        <h2 className="text-lg font-semibold p-4 bg-[#4f45e4] text-white">Chat Users</h2>
        {users.length === 0 && <p className="p-4 text-gray-500">No users found</p>}
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUserId(user.id)}
            className={`p-4 border-b cursor-pointer ${
              selectedUserId === user.id ? 'bg-gray-100' : ''
            }`}
          >
            <p className="font-medium">{user.id}</p>
          </div>
        ))}
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col">
        <div className="bg-[#4f45e4] text-white p-4 text-lg font-semibold">
          {selectedUserId ? `Chat with ${selectedUserId}` : 'Select a user to start chatting'}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded max-w-sm ${
                msg.senderId === selectedUserId
                  ? 'bg-gray-100 text-left'
                  : 'bg-blue-100 ml-auto text-right'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        {selectedUserId && (
          <div className="p-4 border-t flex">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 border px-3 py-2 rounded mr-2"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSend}
              className="bg-[#4f45e4] text-white px-4 py-2 rounded hover:bg-[#3a35cc]"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
