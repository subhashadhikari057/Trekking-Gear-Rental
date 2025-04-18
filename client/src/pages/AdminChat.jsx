// src/pages/AdminChat.jsx
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { jwtDecode } from 'jwt-decode';
const snapshot = await getDocs(collection(db, 'chats'));


export default function AdminChat() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch list of users from chats collection
  const fetchUsers = async () => {
    try {
      // Replace fetchUsers with direct doc access for testing
const docRef = doc(db, 'chats', '680156eba18d5a914efc44f0');
const docSnap = await getDoc(docRef);
console.log('🔥 Direct docSnap exists?', docSnap.exists());
      console.log("📦 Chat snapshot docs:", snapshot.docs);

      const users = snapshot.docs.map(doc => ({
        id: doc.id
      }));

      console.log("✅ Users found:", users);
      setUsers(users);
    } catch (error) {
      console.error("❌ Error fetching chat users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();

    const testFetch = async () => {
      const testId = '680156eba18d5a914efc44f0'; // Replace with actual userId for testing
      const docRef = doc(db, 'chats', testId);
      const snapshot = await getDoc(docRef);
      console.log("🧪 Test doc exists:", snapshot.exists());
    };

    testFetch();
  }, []);

  useEffect(() => {
    console.log("👥 Users in state:", users);
  }, [users]);

  // Load selected user's messages
  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);

    const q = query(
      collection(db, 'chats', userId, 'messages'),
      orderBy('sentAt')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("📩 Messages for user", userId, msgs);
      setMessages(msgs);
    });

    return () => unsubscribe();
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedUserId) return;

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    await addDoc(collection(db, 'chats', selectedUserId, 'messages'), {
      senderId: decoded.id,
      content: newMessage,
      sentAt: serverTimestamp()
    });

    setNewMessage('');
  };

  return (
    <div className="flex max-w-6xl mx-auto mt-6 h-[80vh]">
      {/* User list */}
      <div className="w-1/4 border-r overflow-y-auto">
        <h2 className="text-lg font-semibold p-4 bg-[#4f45e4] text-white">Chat Users</h2>

        {users.length === 0 ? (
          <p className="p-4 text-gray-500">No users found.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleSelectUser(user.id)}
              className={`p-4 border-b cursor-pointer ${
                selectedUserId === user.id ? 'bg-gray-100' : ''
              }`}
            >
              <p className="font-medium">{user.id}</p>
            </div>
          ))
        )}
      </div>

      {/* Chat panel */}
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
