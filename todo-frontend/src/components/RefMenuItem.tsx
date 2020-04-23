import * as React from 'react';
import styled from 'styled-components';

const RefMenuItemBlock = styled.div`
  z-index: 20;
  color: gray;
  cursor: pointer;
  background: white;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  &:hover {
    background: white;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  }
`;
export interface RefMenuItemProps {
  refId: number;
  onClick?: () => void;
  onSelected: (age: number) => void;
}

const RefMenuItem: React.FC<RefMenuItemProps> = ({
  children,
  refId,
  onSelected,
}) => {
  const handleSelect = React.useCallback(() => {
    onSelected(refId);
  }, [onSelected, refId]);

  return <RefMenuItemBlock onClick={handleSelect}>{children}</RefMenuItemBlock>;
};

export default RefMenuItem;
