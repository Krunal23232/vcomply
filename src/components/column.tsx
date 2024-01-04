import { FC } from "react";

// styles and other
import styles from '../styles/components/column.module.scss'
import XDrag from "./drag";
import XDrop from "./drop";
import { IXColumn } from "../interface/interface";
import { STRING } from "../config/string";
import { useDispatch } from "react-redux";
import { deleteTodoData, editTodoData } from "../slice/todo.slice";


const XColumn: FC<IXColumn> = ({ column, tasks, provided }) => {
  const dispatch = useDispatch();

  // edit task
  const handleEdit = (task: any) => {
    const payload = {
      task,
      column
    }
    dispatch(editTodoData(payload))
  }

  // delete task
  const handleDelete = (task:any) => {
    const payload = {
      task,
      column
    }
    dispatch(deleteTodoData(payload))
  }
  return (
    <div className={styles.columnContainer}>
      <h3 {...provided?.dragHandleProps} className={styles.positionTitle}>{column.title}</h3>
      <XDrop droppableId={column.id} type="TASK" className={styles.taskDrop}>
        {tasks.map((task, index) => (
          <XDrag draggableId={task.id} index={index} key={task.id}>
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <img onClick={() => handleDelete(task)} className={styles.closeContainer} src="/bin.svg" />
                <div onClick={() => handleEdit(task)}>
                  <div className={styles.cardHeader}>
                    <span className={styles.taskTitle}>{task.taskTitle}</span>
                    <div className={styles.userContainer}>
                      {task?.username}
                    </div>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <span className={styles.descriptionLabel}>{task?.content}</span>
                  </div>
                </div>

              </div>
            </div>
          </XDrag>
        ))}
      </XDrop>
    </div>
  );
};

export default XColumn;
