"use client";
import { levels } from '@/constants';
import React, { useState } from 'react';

// MeaningEntry Component
const MeaningEntry = ({ index, meaning, handleChange, handleRemove }) => {
  return (
    <div className='bg-gray-100 mt-5 rounded-md mb-4 p-4'>
      <h3 className='font-semibold text-lg ml-[-8px]'>Meaning {index + 1}</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Input fields for meanings */}
        {[
          { label: 'Meaning Subtype', field: 'meaningsubtype', type: 'text' },
          { label: 'Part of Speech', field: 'partOfSpeech', type: 'text' },
          { label: 'Definition', field: 'definition', type: 'textarea' },
          { label: 'Examples (comma-separated)', field: 'examples', type: 'text' },
          { label: 'Synonyms (comma-separated)', field: 'synonyms', type: 'text' },
          { label: 'Antonyms (comma-separated)', field: 'antonyms', type: 'text' },
        ].map(({ label, field, type }) => (
          <div className='w-full' key={field}>
            <label htmlFor={`${field}-${index}`} className="block text-md font-medium my-2">{label}</label>
            {type === 'textarea' ? (
              <textarea
                className='w-full p-2 focus:outline-none border border-gray-300 rounded'
                id={`${field}-${index}`}
                value={meaning[field]}
                onChange={(e) => handleChange(index, field, e.target.value)}
                placeholder={`Enter ${label}`}
                rows={3}
              />
            ) : (
              <input
                className='w-full p-2 focus:outline-none border border-gray-300 rounded'
                id={`${field}-${index}`}
                type="text"
                value={field === 'examples' || field === 'synonyms' || field === 'antonyms' ? meaning[field].join(', ') : meaning[field]}
                onChange={(e) => handleChange(index, field, e.target.value.split(',').map(v => v.trim()))}
                placeholder={`Enter ${label}`}
              />
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className='mt-3 text-red-600 hover:underline'
        onClick={() => handleRemove(index)}
      >
        Remove Meaning
      </button>
    </div>
  );
};

// MeaningForm Component
const MeaningForm = ({ meanings, handleChange, handleAddMeaning, handleRemove }) => {
  return (
    <div className="space-y-4">
      {meanings.map((meaning, index) => (
        <MeaningEntry
          key={index}
          index={index}
          meaning={meaning}
          handleChange={handleChange}
          handleRemove={handleRemove}
        />
      ))}
      <button
        type="button"
        className='mt-3 bg-green-500 text-white p-2 rounded hover:bg-green-600'
        onClick={handleAddMeaning}
      >
        + Add Meaning
      </button>
    </div>
  );
};


const YourPageComponent = () => {
  const [meanings, setMeanings] = useState([{ meaningsubtype: '', partOfSpeech: '', definition: '', examples: [], synonyms: [], antonyms: [] }]);
  const [word, setWord] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [level, setLevel] = useState('');

  const handleChange = (index, field, value) => {
    const newMeanings = [...meanings];
    newMeanings[index][field] = value;
    setMeanings(newMeanings);
  };

  const handleRemove = (index) => {
    const newMeanings = meanings.filter((_, i) => i !== index);
    setMeanings(newMeanings);
  };

  const handleAddMeaning = () => {
    setMeanings([...meanings, { meaningsubtype: '', partOfSpeech: '', definition: '', examples: [], synonyms: [], antonyms: [] }]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      word,
      pronunciation,
      level,
      meanings,

    };
    console.log('Form submitted: ', JSON.stringify(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='w-full'>
          <label htmlFor="word" className="block text-md font-medium my-2 font-opensans text-gray-700">Word</label>
          <input
            className='w-full p-3 focus:outline-none border border-gray-300 rounded'
            id="word"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter Word"
          />
        </div>

        <div className='w-full'>
          <label htmlFor="pronunciation1" className="block text-md font-medium my-2 font-opensans text-gray-700">Pronunciation</label>
          <input
            className='w-full p-3 focus:outline-none border border-gray-300 rounded'
            id="pronunciation1"
            type="text"
            value={pronunciation}
            onChange={(e) => setPronunciation(e.target.value)}
            placeholder="Enter Pronunciation"
          />
        </div>
        <div className='w-full'>
          <label htmlFor="level" className="block text-md font-medium my-2 font-opensans text-gray-700">Level</label>
          <select
            className='w-full p-3 focus:outline-none border border-gray-300 rounded'
            id="level"
            required
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="" disabled>Select Level</option>
            {levels.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
      <MeaningForm
        meanings={meanings}
        handleChange={handleChange}
        handleAddMeaning={handleAddMeaning}
        handleRemove={handleRemove}
      />
      <button
        type="submit"
        className='mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
      >
        Submit
      </button>
    </form>
  );
};

export default YourPageComponent;
