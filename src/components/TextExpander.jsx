import {useState} from "react";

export default function TextExpander(
    {
        collapsedNumWords = 10,
        expandButtonText = 'Show More',
        collapseButtonText = 'Show Less',
        buttonColor = '#ff6622',
        expanded = false,
        className,
        children,
    }
) {
    const [isExpanded, setIsExpanded] = useState(expanded)
    const displayText = isExpanded ? children : children.split(' ').slice(0, collapsedNumWords).join(' ') + '...';
    const buttonStyle = {
        background: 'none',
        border: 'none',
        font: 'inherit',
        cursor: 'pointer',
        color: buttonColor,
        backgroundColor: 'transparent',
        fontSize: '30px'
    }
    return (
        <div className={className}>
            <span style={{fontSize: '30px'}}>
                {displayText}
            </span>
            <button
                style={buttonStyle}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? collapseButtonText : expandButtonText}
            </button>
        </div>
    )
}