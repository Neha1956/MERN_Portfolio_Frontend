import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, deleteMessage } from "../redux/messageSlice";
import { toast } from "react-toastify";

const Messages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(getMessages());
    const interval = setInterval(() => {
      dispatch(getMessages());
    }, 50000); // Refresh every 50 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dispatch]);

  const handleDelete = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const result = await dispatch(deleteMessage(messageId));
        if (result.type === deleteMessage.fulfilled.type) {
          toast.success("Message deleted successfully");
        } else {
          toast.error("Failed to delete message");
        }
      } catch (error) {
        toast.error("Error deleting message");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = (now - date) / 1000;

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-300 hover:text-white"
        >
          <FiArrowLeft /> Back
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">
          Messages
        </h1>

        <div></div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-96">
          <p className="text-slate-300">Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex items-center justify-center min-h-96">
          <p className="text-slate-400">No messages found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <motion.div
              key={msg._id}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col h-full"
            >
              {/* User Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                  <FiUser />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-cyan-300 truncate">{msg.name}</h2>
                  <p className="text-xs text-slate-400 truncate">{msg.email}</p>
                </div>
              </div>

              {/* Message */}
              <div className="bg-slate-900/50 p-3 rounded-xl mb-3 flex-1">
                <p className="text-sm text-slate-300 line-clamp-4">{msg.message}</p>
              </div>

              {/* Time */}
              <p className="text-xs text-slate-500 mb-4">
                {formatDate(msg.createdAt)}
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
              
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-sm"
                >
                  <FiTrash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
