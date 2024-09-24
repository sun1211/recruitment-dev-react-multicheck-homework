import React, {FC, memo} from 'react';
import styled from 'styled-components';

type CardProps = {
    title?: string;
};

/**
 * A Card component that serves as a container for various content types. It optionally displays a title and any children elements passed to it.
 * Styled with a default background and a dedicated title section, this component is ideal for grouping related UI elements
 * in a visually distinct manner, enhancing both organization and presentation.
 *
 * @param {CardProps} props - The properties passed to the Card component.
 * @param {string} [props.title] - Optional title text to be displayed at the top of the card. If not provided, no title section is rendered.
 * @returns {JSX.Element} - A styled card component that can contain arbitrary children, with an optional title.
 *
 * @example
 * // Usage of the Card component with a title
 * <Card title="Card Title">
 *   <p>This is some content inside the card!</p>
 * </Card>
 *
 * @example
 * // Usage of the Card component without a title
 * <Card>
 *   <p>This card has no title but still groups content clearly.</p>
 * </Card>
 */
export const Card: FC<CardProps> = memo((props) => {
    const {title, children} = props;
    return (
        <CardWrapper>
            {title && <h1> {title} </h1>}
            <div>{children}</div>
        </CardWrapper>
    );
});

const CardWrapper = styled.div`
    background-color: #f8f8f8;
    min-width: 640px;

    h1 {
        padding: 0 8px;
        height: 30px;
        justify-content: center;
        background-color: #ccc;
    }

    div {
        padding: 8px;
    }
`;
