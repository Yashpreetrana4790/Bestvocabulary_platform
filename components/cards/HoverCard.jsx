import React from 'react';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

const HoverCard = ({ icon, tooltipText }) => {
    return (
        <div className="hover-card">
            <Tooltip target=".hover-button" position="bottom" />
            <Button className="hover-button p-button-rounded p-button-text" icon={icon} />
            <span className="tooltip-text">{tooltipText}</span>
        </div>
    );
};

export default HoverCard;
