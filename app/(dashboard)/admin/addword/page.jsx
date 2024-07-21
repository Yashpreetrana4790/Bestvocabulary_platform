'use client'
import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import Button from '@/components/Button';

const AddWordForm = () => {
  const [wordName, setWordName] = useState('');
  const [definition, setDefinition] = useState('');
  const [category, setCategory] = useState(null); // State for category dropdown
  const [level, setLevel] = useState(null); // State for level dropdown

  // Options for category and level dropdowns
  const categoryOptions = [
    { label: 'Pro Vocabulary', value: 'pro' },
    { label: 'Basic Vocabulary', value: 'basic' },
    // Add more options as per your category structure
  ];

  const levelOptions = [
    { label: 'Pro', value: 'pro' },
    { label: 'Elementary', value: 'elementary' },
    // Add more options as per your level structure
  ];

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log('Form submitted:', { wordName, definition, category, level });
    // Reset form fields
    setWordName('');
    setDefinition('');
    setCategory(null);
    setLevel(null);
    // Optionally, close the form after submission
    setShowForm(false);
  };

  return (
    <div className='container p-5'>


      {
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Word Name</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter word name"
              value={wordName}
              onChange={(e) => setWordName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Definition</label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter definition"
              rows="4"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <Dropdown
              value={category}
              options={categoryOptions}
              onChange={(e) => setCategory(e.value)}
              placeholder="Select category"
              className="w-full"
              optionLabel="label"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Level</label>
            <Dropdown
              value={level}
              options={levelOptions}
              onChange={(e) => setLevel(e.value)}
              placeholder="Select level"
              className="w-full"
              optionLabel="label"
            />
          </div>

          <Button
            label="Add Word"
            type={"secondary"}
            className=" text-white font-bold py-2 px-4 rounded"
          />

        </form>
      }
    </div>
  );
};

export default AddWordForm;
