import React, { useState } from 'react';
import styled from 'styled-components';
import Item from './Item';
import { IItem } from '../lib/api/todo';
import Form from './Form';
import { useInputValidate } from '../lib/hooks/useInputValidate';
import useToggle from '../lib/hooks/useToggle';
import RefSection from './RefSection';
import RefMenu from './RefMenu';
import Pagination from './Pagination';

const Block = styled.div`
  width: 512px;
  height: 768px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  padding-left: 2rem;
  padding-right: 2rem;
  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  position: relative;

  .wrapper {
    z-index: 100;
    width: 100%;
    display: flex;
    margin-top: 5rem;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .contents {
    width: 512px;
    height: 768px;

    position: relative;
    background: white;
    border-radius: 16px;
    position: relative;
    background: white;
    margin: 0 auto;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
    margin-top: 6rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
  }
`;
const ListBlock = styled.div`
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  .wrapper {
    width: 100%;
    display: flex;
    margin-top: 5rem;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .contents {
    width: 512px;
    height: 768px;

    position: relative;
    background: white;
    border-radius: 16px;
    position: relative;
    background: white;
    margin: 0 auto;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
    margin-top: 6rem;
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
  }
  header {
    width: 100%;
    display: flex;
    background: linear-gradient(
      100deg,
      #008282,
      #005682,
      #000056,
      #2b0057,
      #6a006a
    );
    border-radius: 16px;
    flex: 1;
    h3 {
      align-items: center;
      justify-content: center;
      display: flex;
      flex-basis: 90%;
      color: white;
    }
    button {
      display: flex;
      margin: 1rem;
      width: 4rem;
      outline: none;
      border: none;
      border-radius: 4px;
      background: #20c997;
      font-size: 1rem;
      color: white;
      justify-items: center;
      align-content: center;
      justify-content: space-around;
      cursor: pointer;
      &:hover,
      &:focus {
        background: #20c997;
      }
    }
  }
`;

interface ListProps {
  visible: boolean;
  todoItems: IItem;
  onVisible: () => void;
  onToggle: (id: number, isCompleted: boolean) => void;
  onDelete: (id: number) => void;
  addTodoList: (todo: string, refNum: number) => void;
}
const List: React.FC<ListProps> = ({
  todoItems,
  visible,
  onVisible,
  onDelete,
  onToggle,
  addTodoList,
}) => {
  const [val, setVal, isError, isEmpty] = useInputValidate();
  const [userMenu, toggleUserMenu] = useToggle(false);
  const [refNum, serRefNum] = useState(0);
  const [page, setPage] = React.useState<number>(1);

  const onChangeInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setVal(target.value);
  };

  const onSubmit = () => {
    if (isEmpty || isError) {
      return;
    }
    addTodoList(val, refNum);
    setVal('');
    serRefNum(0);
  };
  return (
    <Block>
      <div className="wrapper">
        <Form
          value={val}
          refNum={refNum}
          onChange={onChangeInput}
          onSubmit={onSubmit}
        >
          <RefSection status={refNum} onClick={toggleUserMenu} />
          <RefMenu
            items={todoItems}
            onClose={toggleUserMenu}
            onSelected={serRefNum}
            visible={userMenu}
          />
        </Form>
      </div>
      <div className="contents">
        <ListBlock>
          <header>
            <h3>Todo App</h3>
            <button onClick={onVisible}>
              {!visible ? '숨기기' : '보여줘'}
            </button>
          </header>
          {todoItems.todo && (
            <Pagination
              setPage={setPage}
              page={page}
              totalCount={todoItems.todo && todoItems.todo.length}
            />
          )}
          {todoItems.todo &&
            todoItems.todo
              .slice((page - 1) * 5, page * 5)
              .map(todo => (
                <Item
                  key={todo.id}
                  id={todo.id}
                  visible={visible}
                  status={todo.isCompleted}
                  updateAt={todo.updatedAt}
                  title={todo.title}
                  refId={todo.assoicates[0] && todo.assoicates[0].parentId}
                  onToggle={() => onToggle(todo.id, todo.isCompleted)}
                  onDelete={() => onDelete(todo.id)}
                />
              ))}
        </ListBlock>
      </div>
    </Block>
  );
};

export default List;
