// src/components/ChatWidget.jsx
import { useEffect, useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { jwtDecode } from 'jwt-decode';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState(null);

  const suggestions = [
    'How to rent gear?',
    'Where do you deliver?',
    'What are the payment options?',
  ];

  const autoReplies = {
    'How to rent gear?': 'To rent gear, browse the catalog and click "Add to Cart". Then proceed to checkout.',
    'Where do you deliver?': 'We deliver across all major cities in Nepal. Delivery charges may apply.',
    'What are the payment options?': 'We accept Khalti, eSewa, and Cash on Delivery.',
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const decoded = jwtDecode(token);
    setUserId(decoded.id);

    const userChatRef = collection(db, 'chats', decoded.id, 'messages');
    const q = query(userChatRef, orderBy('sentAt'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (msgText) => {
    if (!msgText.trim() || !userId) return;
    const msgRef = collection(db, 'chats', userId, 'messages');

    try {
      // User message
      await addDoc(msgRef, {
        senderId: userId,
        content: msgText,
        sentAt: serverTimestamp()
      });

      // Auto reply
      if (autoReplies[msgText]) {
        await addDoc(msgRef, {
          senderId: 'support-bot',
          content: autoReplies[msgText],
          sentAt: serverTimestamp()
        });
      }

      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  if (!userId) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          className="bg-[#4f45e4] text-white p-4 rounded-full shadow-lg hover:bg-[#3a35cc]"
          onClick={() => setOpen(true)}
        >
          <FaComments className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white shadow-xl w-80 rounded-lg overflow-hidden">
          <div className="bg-[#4f45e4] text-white px-4 py-2 flex justify-between items-center">
            <span>Support Chat</span>
            <FaTimes className="cursor-pointer" onClick={() => setOpen(false)} />
          </div>

          <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded max-w-[75%] ${
                  msg.senderId === userId
                    ? 'bg-blue-100 self-end ml-auto text-right'
                    : 'bg-gray-200 self-start text-left'
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="px-3 py-2 border-t space-y-2">
            <div className="text-xs text-gray-500 mb-1">Suggestions:</div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((sugg) => (
                <button
                  key={sugg}
                  onClick={() => sendMessage(sugg)}
                  className="bg-gray-100 text-xs px-2 py-1 rounded hover:bg-gray-200"
                >
                  {sugg}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center border-t p-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(newMessage)}
              className="flex-1 border px-2 py-1 rounded mr-2"
              placeholder="Type a message..."
            />
            <button
              onClick={() => sendMessage(newMessage)}
              className="bg-[#4f45e4] text-white px-3 py-1 rounded hover:bg-[#3a35cc]"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
