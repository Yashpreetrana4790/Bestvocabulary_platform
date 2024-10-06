"use client";
import { levels, partofSpeech } from '@/constants';
import { AddNewWord } from '@/utils/Addword/addword.action';
import React, { useState } from 'react';

// MeaningEntry Component
const MeaningEntry = ({ index, meaning, handleChange, handleRemove }) => {
  return (
    <div className="border border-gray-300 p-4 rounded">
      <div className="flex justify-between">
        <h4 className="font-semibold">Meaning {index + 1}</h4>
        <button
          type="button"
          className="text-red-500 hover:text-red-700"
          onClick={() => handleRemove(index)}
        >
          Remove
        </button>
      </div>
      <input
        type="text"
        placeholder="Meaning Subtype"
        value={meaning.meaningsubtype}
        onChange={(e) => handleChange(index, 'meaningsubtype', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <select
        className="w-full p-2 border border-gray-300 rounded my-2"
        value={meaning.partOfSpeech}
        onChange={(e) => handleChange(index, 'partOfSpeech', e.target.value)}
      >
        <option value="">Choose Part of Speech</option>
        {partofSpeech.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Definition"
        value={meaning.definition}
        onChange={(e) => handleChange(index, 'definition', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="text"
        placeholder="Examples (comma separated)"
        value={meaning.example} // Join the sentences back to a single string
        onChange={(e) => handleChange(index, 'examples', e.target.value)} // Handle input change
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="text"
        placeholder="Synonyms (comma separated)"
        value={meaning.synonyms.join(', ')}
        onChange={(e) => handleChange(index, 'synonyms', e.target.value.split(',').map(item => item.trim()))}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="text"
        placeholder="Antonyms (comma separated)"
        value={meaning.antonyms.join(', ')}
        onChange={(e) => handleChange(index, 'antonyms', e.target.value.split(',').map(item => item.trim()))}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
    </div>
  );
};

// IdiomEntry Component
const IdiomEntry = ({ index, idiom, handleChange, handleRemove }) => {
  return (
    <div className="border border-gray-300 p-4 rounded">
      <div className="flex justify-between">
        <h4 className="font-semibold">Idiom {index + 1}</h4>
        <button
          type="button"
          className="text-red-500 hover:text-red-700"
          onClick={() => handleRemove(index)}
        >
          Remove
        </button>
      </div>
      <input
        type="text"
        placeholder="Idiom"
        value={idiom.idiom}
        onChange={(e) => handleChange(index, 'idiom', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="text"
        placeholder="Definition"
        value={idiom.definition}
        onChange={(e) => handleChange(index, 'definition', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="text"
        placeholder="Examples (comma separated)"
        value={idiom.examples.map(example => example.sentence).join(', ')}
        onChange={(e) => handleChange(index, 'examples', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="text"
        placeholder="Synonyms (comma separated)"
        value={idiom.synonyms.join(', ')}
        onChange={(e) => handleChange(index, 'synonyms', e.target.value.split(',').map(item => item.trim()))}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="text"
        placeholder="Antonyms (comma separated)"
        value={idiom.antonyms.join(', ')}
        onChange={(e) => handleChange(index, 'antonyms', e.target.value.split(',').map(item => item.trim()))}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
    </div>
  );
};

// PhraseEntry Component
const PhraseEntry = ({ index, phrase, handleChange, handleRemove }) => {
  return (
    <div className="border border-gray-300 p-4 rounded">
      <div className="flex justify-between">
        <h4 className="font-semibold">Phrase {index + 1}</h4>
        <button
          type="button"
          className="text-red-500 hover:text-red-700"
          onClick={() => handleRemove(index)}
        >
          Remove
        </button>
      </div>
      <input
        type="text"
        placeholder="Phrase"
        value={phrase.phrase}
        onChange={(e) => handleChange(index, 'phrase', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="text"
        placeholder="Definition"
        value={phrase.definition}
        onChange={(e) => handleChange(index, 'definition', e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="text"
        placeholder="Examples (comma separated)"
        value={phrase.examples.map(example => example.sentence).join(', ')}
        onChange={(e) => {
          const examplesArray = e.target.value.split(',').map(item => ({ sentence: item.trim() })).filter(item => item.sentence);
          handleChange(index, 'examples', examplesArray);
        }}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="text"
        placeholder="Synonyms (comma separated)"
        value={phrase.synonyms.join(', ')}
        onChange={(e) => handleChange(index, 'synonyms', e.target.value.split(',').map(item => item.trim()))}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
      <input
        type="text"
        placeholder="Antonyms (comma separated)"
        value={phrase.antonyms.join(', ')}
        onChange={(e) => handleChange(index, 'antonyms', e.target.value.split(',').map(item => item.trim()))}
        className="w-full p-2 border border-gray-300 rounded mt-2"
      />
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
        className="mt-3 bg-green-500 text-white p-2 rounded hover:bg-green-600"
        onClick={handleAddMeaning}
      >
        + Add Meaning
      </button>
    </div>
  );
};

// Addword Component
const Addword = () => {
  const [meanings, setMeanings] = useState([{ meaningsubtype: '', partOfSpeech: '', definition: '', examples: [], synonyms: [], antonyms: [] }]);
  const [idioms, setIdioms] = useState([]);
  const [phrases, setPhrases] = useState([]);
  const [word, setWord] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [level, setLevel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMeaningChange = (index, field, value) => {
    const newMeanings = [...meanings];
    newMeanings[index][field] = value;
    setMeanings(newMeanings);
  };

  const handleAddMeaning = () => {
    setMeanings([...meanings, { meaningsubtype: '', partOfSpeech: '', definition: '', examples: [], synonyms: [], antonyms: [] }]);
  };

  const handleRemoveMeaning = (index) => {
    const newMeanings = meanings.filter((_, i) => i !== index);
    setMeanings(newMeanings);
  };

  const handleIdiomChange = (index, field, value) => {
    const newIdioms = [...idioms];
    newIdioms[index][field] = value; 
    setIdioms(newIdioms);
  };

  const handleAddIdiom = () => {
    setIdioms([...idioms, { idiom: '', definition: '', examples: [], synonyms: [], antonyms: [] }]);
  };

  const handleRemoveIdiom = (index) => {
    const newIdioms = idioms.filter((_, i) => i !== index);
    setIdioms(newIdioms);
  };

  const handlePhraseChange = (index, field, value) => {
    const newPhrases = [...phrases];
    newPhrases[index][field] = value; 
    setPhrases(newPhrases);
  };

  const handleAddPhrase = () => {
    setPhrases([...phrases, { phrase: '', definition: '', examples: [], synonyms: [], antonyms: [] }]);
  };

  const handleRemovePhrase = (index) => {
    const newPhrases = phrases.filter((_, i) => i !== index);
    setPhrases(newPhrases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);


    const processedMeanings = meanings.map(meaning => {
      // If examples is a string, split it and map to the desired format
      if (typeof meaning.examples === 'string') {
        const processedExamples = meaning.examples
          .split(',') // Split by commas
          .map(example => example.trim()) // Remove extra spaces
          .filter(example => example) // Filter out any empty strings
          .map(example => ({ sentence: example })); // Map each to an object
  
        return {
          ...meaning,
          examples: processedExamples // Replace the examples string with the array of objects
        };
      }
      return meaning; // Return the meaning if no processing is needed
    });

    const data = {
      word,
      pronunciation,
      level,
      meanings : processedMeanings,
      idioms,
      phrases,
    };


    console.log(data, "data", meanings, "meanings");

    try {
      await AddNewWord(data);
      setWord('');
      setPronunciation('');
      setLevel('');
      setMeanings([{ meaningsubtype: '', partOfSpeech: '', definition: '', examples: [], synonyms: [], antonyms: [] }]);
      setIdioms([]);
      setPhrases([]);
    } catch (error) {
      console.error('Error adding new word:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block">Word</label>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block">Pronunciation</label>
        <input
          type="text"
          value={pronunciation}
          onChange={(e) => setPronunciation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block">Level</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Level</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>
      <MeaningForm
        meanings={meanings}
        handleChange={handleMeaningChange}
        handleAddMeaning={handleAddMeaning}
        handleRemove={handleRemoveMeaning}
      />
      <h3 className="text-xl font-bold">Idioms</h3>
      <div className="space-y-4">
        {idioms.map((idiom, index) => (
          <IdiomEntry
            key={index}
            index={index}
            idiom={idiom}
            handleChange={handleIdiomChange}
            handleRemove={handleRemoveIdiom}
          />
        ))}
        <button
          type="button"
          className="mt-3 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={handleAddIdiom}
        >
          + Add Idiom
        </button>
      </div>
      <h3 className="text-xl font-bold">Phrases</h3>
      <div className="space-y-4">
        {phrases.map((phrase, index) => (
          <PhraseEntry
            key={index}
            index={index}
            phrase={phrase}
            handleChange={handlePhraseChange}
            handleRemove={handleRemovePhrase}
          />
        ))}
        <button
          type="button"
          className="mt-3 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          onClick={handleAddPhrase}
        >
          + Add Phrase
        </button>
      </div>
      <button
        type="submit"
        className={`mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Add Word'}
      </button>
    </form>
  );
};

export default Addword;
