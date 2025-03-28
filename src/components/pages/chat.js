import { useEffect, useState, useRef } from "react";
import { supabase } from "../context/supbaseClient";
import "../style/Chat.css"; 

function Chat({ teamId, teamMembers }) {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  // Get current user session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      if (data?.subscription) {
        data.subscription.unsubscribe();
      }
    };
  }, []);

  // Fetch messages and setup real-time updates
  useEffect(() => {
    if (!session?.user) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select()
        .eq("team_id", teamId)
        .order("timestamp", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error.message);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    // Subscribe to real-time messages
    const subscription = supabase
      .channel(`team_chat_${teamId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [session, teamId]);

  // Ensure teamMembers is always an array
  const isUserInTeam = (teamMembers || []).some(
    (member) =>
      member?.email && member.email === session?.user?.user_metadata?.email
  );

  // Send message function with optimistic update
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    if (!isUserInTeam) {
      alert("Only team members can send messages.");
      return;
    }

    const messageData = {
      team_id: teamId,
      message: newMessage,
      user_name: session?.user?.user_metadata?.email,
      avatar: session?.user?.user_metadata?.avatar_url,
      timestamp: new Date().toISOString(),
    };

    // Optimistic UI update
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage(""); // Clear input field immediately

    const { error } = await supabase.from("messages").insert([messageData]);

    if (error) {
      console.error("Error saving message:", error.message);
      // Remove message from UI if insertion fails
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg !== messageData)
      );
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };  

  

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign out error:", error.message);
    }
  };

  // If user is not logged in
  if (!session) {
    return (
      <div className="chat-container"> 
      <p style={{  color: "red" }} > Sign in with Google to chat.Please sign in with same mail which you given to join this team. </p> 

         <div className="chat-container">
        <button onClick={signIn}>Sign in</button>
      </div>
      </div>
    );
  }

  if (!isUserInTeam) {
    return (
      <div className="chat-container">
        <p style={{  color: "red" }} >You must be a team member to see and send messages. Sign in with Google to chat.Please sign in with same mail which you given to join this team </p>  
        <div className="chat-container">
        <button onClick={signIn}>Sign in</button>
      </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">
          <div>
            <p>Signed in as {session?.user?.user_metadata?.email}</p>
          </div>
          <button onClick={signOut} style={{ backgroundColor: "red", color: "black" }}>
           Sign out
          </button>
        </div>

        {/* Chat Messages */}
        <div ref={chatContainerRef} className="chat-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${
                msg?.user_name === session?.user?.user_metadata?.email ? "sent" : "received"
              }`}
            >
              {msg?.user_name !== session?.user?.user_metadata?.email && (
                <img src={msg?.avatar} alt="Avatar" className="avatar" />
              )}
              <div className="message-content">{msg.message}</div>
              <div className="message-timestamp">
                {new Date(msg?.timestamp).toLocaleTimeString()}
              </div>
              {msg?.user_name === session?.user?.user_metadata?.email && (
                <img src={msg?.avatar} alt="Avatar" className="avatar" />
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="chat-input">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Type a message..."
            disabled={!isUserInTeam}
          />
          <button disabled={!isUserInTeam}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
