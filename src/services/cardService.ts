import { nanoid } from "nanoid";

const create = (event: any, data: any) => {
  const title = event.target["title"].value;
  if (!title) return;
  const newCardId = nanoid();

  const newData = {
    ...data,
    columns: {
      ...data.columns,
      [newCardId]: {
        id: newCardId,
        title: title,
        taskIds: [],
      },
    },
    columnOrder: [...data.columnOrder, newCardId],
  };

  return newData;
};

const destroy = (id: string, data: any) => {
  const index: number = data.columnOrder.indexOf(id as never);
  const newData = data;

  delete newData.columns[id];
  newData.columnOrder.splice(index, 1);
  return newData;
};

export { create, destroy };
