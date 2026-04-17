export const Alert = ({ type, message, onClose }) => {
  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const icon = type === 'success' ? '✓' : '✕';

  return (
    <div className={`${bgColor} border ${textColor} px-4 py-3 rounded-lg flex justify-between items-center mb-4`}>
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold">{icon}</span>
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-xl opacity-50 hover:opacity-100 transition"
      >
        ✕
      </button>
    </div>
  );
};
