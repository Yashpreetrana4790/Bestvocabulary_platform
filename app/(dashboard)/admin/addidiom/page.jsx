'use client'

// components/AddIdiomForm.js

import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { InputTextarea } from 'primereact/inputtextarea';

const AddIdiomForm = () => {
  const [idiom, setIdiom] = useState('');
  const [meaning, setMeaning] = useState('');
  const [origin, setOrigin] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');
  const [explanation, setExplanation] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to backend or process locally
    console.log({
      idiom,
      meaning,
      origin,
      exampleSentence,
      explanation,
      category,
      tags
    });
    // Reset form fields if needed
    setIdiom('');
    setMeaning('');
    setOrigin('');
    setExampleSentence('');
    setExplanation('');
    setCategory('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-field">
        <label htmlFor="idiom" className="block text-sm font-medium text-gray-700">Idiom</label>
        <InputTextarea id="idiom" value={idiom} onChange={(e) => setIdiom(e.target.value)} />
      </div>
      <div className="p-field">
        <label htmlFor="meaning" className="block text-sm font-medium text-gray-700">Meaning</label>
        <InputTextarea id="meaning" value={meaning} onChange={(e) => setMeaning(e.target.value)} />
      </div>
      <div className="p-field">
        <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origin</label>
        <InputTextarea id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
      </div>
      <div className="p-field">
        <label htmlFor="exampleSentence" className="block text-sm font-medium text-gray-700">Example Sentence</label>
        <InputTextarea id="exampleSentence" value={exampleSentence} onChange={(e) => setExampleSentence(e.target.value)} />
      </div>
      <div className="p-field">
        <label htmlFor="explanation" className="block text-sm font-medium text-gray-700">Explanation</label>
        <InputTextarea id="explanation" value={explanation} onChange={(e) => setExplanation(e.target.value)} />
      </div>
      <div className="p-field">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <InputText id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div className="p-field">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
        <InputText id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" label="Submit" className="p-button-primary" />
      </div>
    </form>
  );
};

export default AddIdiomForm;
