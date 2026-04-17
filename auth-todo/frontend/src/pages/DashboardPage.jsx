import { useState, useEffect } from 'react';
import { TodoForm } from '../components/TodoForm';
import { TodoItem } from '../components/TodoItem';
import { Alert } from '../components/Alert';
import { todoAPI } from '../services/api';
import { Navbar } from '../components/Navbar';

export const DashboardPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [filter, setFilter] = useState('all'); // all, pending, completed

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await todoAPI.getAll();
      setTodos(response.data);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to fetch todos' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (data) => {
    try {
      const response = await todoAPI.create(data);
      setTodos([response.data, ...todos]);
      setAlert({ type: 'success', message: 'Todo added successfully!' });
      setTimeout(() => setAlert({ type: '', message: '' }), 3000);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add todo';
      setAlert({ type: 'error', message });
    }
  };

  const handleUpdateTodo = async (id, data) => {
    try {
      const response = await todoAPI.update(id, data);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
      setAlert({ type: 'success', message: 'Todo updated successfully!' });
      setTimeout(() => setAlert({ type: '', message: '' }), 3000);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update todo';
      setAlert({ type: 'error', message });
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoAPI.delete(id);
      setTodos(todos.filter(todo => todo._id !== id));
      setAlert({ type: 'success', message: 'Todo deleted successfully!' });
      setTimeout(() => setAlert({ type: '', message: '' }), 3000);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete todo';
      setAlert({ type: 'error', message });
    }
  };

  // Filter todos based on status
  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    pending: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-gray-600">Total Todos</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-gray-600">Pending</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-gray-600">Completed</div>
            </div>
          </div>

          {/* Alert */}
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert({ type: '', message: '' })}
          />

          {/* Add Todo Form */}
          <TodoForm onAdd={handleAddTodo} />

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === 'completed'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Completed ({stats.completed})
            </button>
          </div>

          {/* Todos List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-gray-600 mt-4">Loading todos...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="bg-white p-12 rounded-lg shadow-md text-center">
              <p className="text-2xl text-gray-400">📭</p>
              <p className="text-gray-600 mt-4">
                {filter === 'all' && 'No todos yet. Create one to get started!'}
                {filter === 'pending' && 'No pending todos. Great job!'}
                {filter === 'completed' && 'No completed todos yet.'}
              </p>
            </div>
          ) : (
            <div>
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
