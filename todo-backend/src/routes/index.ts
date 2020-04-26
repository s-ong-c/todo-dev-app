import Router from 'koa-router';
import { Todo, Assoicate } from '../db';

const routes = new Router();

routes.get('/', ctx => {
  ctx.body = 'hello world!!!!';
});

routes.get('/all', async ctx => {
  const seriesPosts = await Todo.findAll({
    include: {
      model: Assoicate
    }
  });
  const todo = await Todo.findAll();

  ctx.body = { todo: seriesPosts };
});

routes.put('/refer/:id', async ctx => {
  const refer = await Assoicate.findOne({
    where: {
      parentId: ctx.params.id
    }
  });
  if (!refer) {
    return;
  }
  if (refer) {
    ctx.body = refer;
  }
});

routes.post('/create', async ctx => {
  type RequestBody = {
    title: string;
    id: number;
  };
  const { title, id }: RequestBody = ctx.request.body;

  if (typeof title !== 'string') {
    ctx.status = 403;
    return;
  }
  try {
    const todo = await Todo.create({
      title,
      status: id && '1'
    });
    if (ctx.request.body.id) {
      const notes = await Assoicate.findByPk(id);

      await Assoicate.create({
        todoId: todo.id,
        parentId: id
      });
    }
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e);
  }
});

routes.get('/refer/:id', async ctx => {
  type RequestBody = {
    id: number;
  };
  const { id }: RequestBody = ctx.request.body;

  try {
    const { isCompleted } = await Todo.findOne(id);
    ctx.status = 200;
    ctx.body = { isCompleted };
  } catch (e) {
    ctx.throw(e);
  }
});

routes.put('/toggle/:id', async ctx => {
  type RequestBody = {
    title?: string;
    id: number;
    isCompleted: boolean;
  };
  const { title, id, isCompleted }: RequestBody = ctx.request.body;
  if (isNaN(Number(ctx.params.id))) {
    ctx.status = 400;
    return;
  }

  Todo.update(
    {
      isCompleted,
      title
    },
    {
      where: {
        id: ctx.params.id
      }
    }
  );

  /** 새로운 참조 && 참조 수정 */
  const Exist = await Assoicate.findOne({
    where: {
      todoId: ctx.params.id
    }
  });

  if (id) {
    if (Exist) {
      Assoicate.update(
        {
          todoId: ctx.params.id,
          parentId: id
        },
        {
          where: {
            id: Exist.assoicateId
          }
        }
      );
    } else {
      Assoicate.create({
        todoId: ctx.params.id,
        parentId: id
      });
    }
  }
  ctx.body = `Todo ${ctx.params.id} updated successfully`;
});

routes.post('/delete/:id', async ctx => {
  /** if 참조 중이라면 */
  const is_todoId = await Assoicate.findOne({
    where: {
      todoId: ctx.params.id
    }
  });
  const is_refer = await Assoicate.findOne({
    where: {
      parentId: ctx.params.id
    }
  });

  if (is_todoId && is_refer) {
    await Assoicate.destroy({
      where: {
        assoicateId: is_todoId.assoicateId
      }
    });
    await Assoicate.destroy({
      where: {
        assoicateId: is_refer.assoicateId
      }
    });
    await Todo.destroy({
      where: {
        id: ctx.params.id
      }
    });
  } else if (is_todoId) {
    await Assoicate.destroy({
      where: {
        assoicateId: is_todoId.assoicateId
      }
    });
    await Todo.destroy({
      where: {
        id: ctx.params.id
      }
    });
  } else if (is_refer) {
    await Assoicate.destroy({
      where: {
        assoicateId: is_refer.assoicateId
      }
    });
    await Todo.destroy({
      where: {
        id: ctx.params.id
      }
    });
  } else {
    /** 참조 없는 상태라면 삭제 */
    await Todo.destroy({
      where: {
        id: ctx.params.id
      }
    });
  }
  ctx.body = `Todo ${ctx.params.id} delete successfully`;
});

export default routes;
