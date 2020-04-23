import React, { useEffect } from 'react';
import {
  getTodoList,
  IItem,
  crateTodo,
  toggleTodo,
  deleteTodo,
} from '../lib/api/todo';
import List from '../components/List';
import useToggle from '../lib/hooks/useToggle';
import useRequest from '../lib/hooks/useRequest';
export interface TodoContainerProps {}
function TodoContainer(props: TodoContainerProps) {
  // button toggle hidden show

  const [closed, setClosed] = useToggle(false);

  const [setListData, , items] = useRequest<IItem | null>(
    async () => await getTodoList(),
  );
  /** GET ALL */

  useEffect(() => {
    let mounted = false;
    if (!items && !mounted) {
      setListData();
    }
    return () => {
      mounted = true;
    };
  }, [items, setListData]);

  /** ADD */
  const onClickSubmit = (todo: string, refNum: number) => {
    refNum === 0
      ? crateTodo({
          todo: { title: todo },
        })
      : crateTodo({
          todo: { title: todo, id: refNum },
        });
    setTimeout(() => {
      setListData();
    }, 500);
  };

  /** UPDATE */
  const onToggleSubmit = (id: number, isCompleted: boolean) => {
    toggleTodo(id, isCompleted ? false : true);
    setTimeout(() => {
      setListData();
    }, 500);
  };
  /** DELETE */
  const onDeleteSubmit = (id: number) => {
    deleteTodo(id);
    setTimeout(() => {
      setListData();
    }, 500);
  };

  if (!items) return null;
  return (
    <>
      <List
        addTodoList={onClickSubmit}
        todoItems={items}
        onDelete={onDeleteSubmit}
        onToggle={onToggleSubmit}
        onVisible={setClosed}
        visible={closed}
      />
    </>
  );
}

export default TodoContainer;
