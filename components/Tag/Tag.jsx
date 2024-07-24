import React from 'react';
import { Tag } from 'primereact/tag';
import { Carousel } from 'primereact/carousel';

const ReTag = ({ items }) => {
  const tagTemplate = (option) => (
    <Tag
      key={option.value}
      severity="success"
      value={option.label}
      icon={option.icon}
      className="bg-gray-800 text-white rounded-full px-4 py-2 m-1"
    />
  );

  const options = items.flatMap(group =>
    group.items.flatMap(category => category.options)
  );

  return (
    <Carousel
      value={options}
      itemTemplate={tagTemplate}
      numVisible={15}
      numScroll={1}
      circular
      autoplayInterval={3000}
    />
  );
};

export default ReTag;
