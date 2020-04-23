import * as React from 'react';
import styled from 'styled-components';
import RefMenuItem from './RefMenuItem';
import OutsideClickHandler from 'react-outside-click-handler';
import { IItem } from '../lib/api/todo';

const RefMenuBlock = styled.div`
  position: absolute;
  z-index: 30;
  margin-top: 1rem;
  margin-left: 1rem;
  right: 0;
  > .menu-wrapper {
    width: 10rem;
    height: 3rem;

    background: white;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  }
`;
export interface RefMenuProps {
  onClose: () => void;
  onSelected: (refId: number) => void;
  visible: boolean;
  items: IItem;
}

const RefMenu: React.FC<RefMenuProps> = ({
  items,
  onClose,
  onSelected,
  visible,
}) => {
  if (!visible) return null;
  return (
    <OutsideClickHandler onOutsideClick={onClose}>
      <RefMenuBlock>
        <div className="menu-wrapper">
          {items.todo.map(todo => (
            <RefMenuItem key={todo.id} refId={todo.id} onSelected={onSelected}>
              {todo.id}
            </RefMenuItem>
          ))}
        </div>
      </RefMenuBlock>
    </OutsideClickHandler>
  );
};

export default RefMenu;
