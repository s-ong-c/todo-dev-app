import React, { useEffect } from 'react';
import {
  getTodoList,
  IItem,
  crateTodo,
  toggleTodo,
  deleteTodo,
  isRefCompleted,
} from '../lib/api/todo';
import List from '../components/List';
import useToggle from '../lib/hooks/useToggle';
import { useDispatch } from 'react-redux';
import { todoActions } from '../modules/todo';
import Filters from '../components/Filters';

export interface TodoContainerProps {}
function TodoContainer(props: TodoContainerProps) {
  // button toggle hidden show

  const [closed, setClosed] = useToggle(false);
  const dispatch = useDispatch();

  const [items, getInfo] = React.useState<IItem | null>(null);

  /** GET ALL */
  const getList = async () => {
    const data = await getTodoList();
    getInfo(data);

    dispatch(todoActions.add(data.todo));
  };
  useEffect(() => {
    getList();
    return () => {};
    // eslint-disable-next-line
  }, []);

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
      getList();
    }, 500);
  };

  /** UPDATE */
  const onToggleSubmit = async (
    id: number,
    isCompleted: boolean,
    referId?: number,
  ) => {
    if (referId) {
      const isReferCompleted = await isRefCompleted(referId);
      isReferCompleted
        ? toggleTodo(id, isCompleted ? false : true)
        : alert('먼저 참조 아이디 todo를 완료하세요');
    } else {
      toggleTodo(id, isCompleted ? false : true);
    }
    setTimeout(() => {
      getList();
    }, 500);
  };
  /** DELETE */
  const onDeleteSubmit = (id: number) => {
    deleteTodo(id);
    setTimeout(() => {
      getList();
    }, 500);
  };

  if (!items) return null;

  return (
    <List
      addTodoList={onClickSubmit}
      todoItems={items}
      onDelete={onDeleteSubmit}
      onToggle={onToggleSubmit}
      onVisible={setClosed}
      visible={closed}
    >
      <Filters />
    </List>
  );
}

export default TodoContainer;
