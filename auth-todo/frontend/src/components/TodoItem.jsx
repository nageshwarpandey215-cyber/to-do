import { useState } from 'react';

export const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      await onUpdate(todo._id, {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editedTitle.trim()) return;
    setLoading(true);
    try {
      await onUpdate(todo._id, {
        title: editedTitle,
        description: editedDescription,
        completed: todo.completed,
      });
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setLoading(true);
      try {
        await onDelete(todo._id);
      } finally {
        setLoading(false);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-400 mb-3">
        <div className="space-y-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              disabled={loading}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white py-2 rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md border-l-4 mb-3 transition ${todo.completed ? 'border-gray-300' : 'border-blue-400'}`}>
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          disabled={loading}
          className="mt-1 w-5 h-5 text-blue-600 rounded cursor-pointer disabled:opacity-50"
        />
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {todo.title}
          </h3>
          {todo.description && (
            <p className={`text-sm mt-1 ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}
          <span className={`inline-block text-xs mt-2 px-2 py-1 rounded ${todo.completed ? 'bg-gray-200 text-gray-700' : 'bg-blue-200 text-blue-700'}`}>
            {todo.completed ? 'Completed ✓' : 'Pending'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white px-3 py-1 rounded-lg text-sm transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
