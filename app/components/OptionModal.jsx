import React, { useState } from 'react';

export default function OptionModal ({ showModal, setShowModal}){
  const [newLabel, setNewLabel] = useState('');

  const handleSubmit = () => {
    console.log(showModal)
    setShowModal(false);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 pointer-events-none`}>
      <div className="modal bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl mb-4">Change Label</h2>
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="New Label"
          className="w-full border p-2 mb-4"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Submit
        </button>
        <button
          onClick={setShowModal(false)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
