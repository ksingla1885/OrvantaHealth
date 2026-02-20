import React, { useState, useEffect, useRef } from 'react';
import { useChatbot } from '../context/ChatbotContext';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chatbot = () => {
  const { isOpen, messages, isLoading, error, toggleChatbot, sendMessage, clearMessages } = useChatbot();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      clearMessages();
    }
  }, [isOpen, messages.length, clearMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) {
    return (
      <div className="chatbot-container">
        <button
          onClick={toggleChatbot}
          className="chatbot-button group"
          aria-label="Open chatbot"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-window open">
        {/* Header */}
        <div className="chatbot-header">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <h3 className="font-semibold">MediCore Assistant</h3>
          </div>
          <button
            onClick={toggleChatbot}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close chatbot"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chatbot-message ${message.type} flex items-start space-x-2`}
            >
              {message.type === 'bot' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
              {message.type === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
              <div className="flex-1">
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="chatbot-message bot flex items-center space-x-2">
              <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="chatbot-message bot bg-red-100 text-red-800">
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="chatbot-input-container">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about health, medical conditions, doctors..."
              className="chatbot-input"
              disabled={isLoading}
              maxLength={500}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="btn btn-primary px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            I can only help with healthcare-related topics.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
