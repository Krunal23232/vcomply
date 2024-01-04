import { FC, useEffect, useState } from "react";

// styles and other things
import styles from '../styles/pages/home.module.scss'
import XDrop from "../components/drop";
import XDrag from "../components/drag";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import XColumn from "../components/column";
import { addTask, deleteTask, onChange } from "../utills/utills";
import Modal from "../components/Modal";
import { HeaderPropsInterface, IData } from "../interface/interface";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import db from "../firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTodo } from "../middleware/todo";
import { getTodoSuccess, onDrag, resetMessage } from "../slice/todo.slice";
import { toast } from "react-toastify";


const Home: FC<HeaderPropsInterface> = ({ setIsModalOpen, isOpenModal }) => {
  const dispatch = useDispatch();
  const {
    todos,
    createTodoMessage, editTodo
  } = useSelector((state: any) => state.todo);

  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isFirst, setIsFirst] = useState<boolean>(false);

  useEffect(() => {
    function onlineHandler() {
      setTodoData();
    }

    function offlineHandler() {
      setIsOnline(false);
    }


    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);
    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);


  useEffect(() => {
    if (isOnline) {
      dispatch(getTodo())
    }
  }, [isOnline])

  useEffect(() => {
    setTodoData();
  }, [todos, isOnline])


  const setTodoData = () => {
    if (isOnline) {
      if (isFirst) {
        setDoc(doc(db, "todos", "todoData"), {
          ...todos
        });
        toast.success(createTodoMessage)
        dispatch(resetMessage())
      }
      setIsFirst(true);
    }
  }

  // realtime data manage
  useEffect(() => {
    if (isOnline) {
      const unsub = onSnapshot(collection(db, 'todos'), (snap) => {
        snap.forEach((doc: any) => {
          dispatch(getTodoSuccess(doc.data() as IData));
        });
      })
      return unsub;
    }
  }, [isOnline])


  // edit modal open
  useEffect(() => {
    if (editTodo) {
      setIsModalOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTodo]);




  const onDragEnd = (res: DropResult) => {
    const { source, destination, draggableId } = res;
    console.log(source, destination, draggableId);

    if (!destination) return;
    if (onChange(source, destination)) return;
    if (res.type === "TASK") {
      let newData = deleteTask(todos, source);
      newData = addTask(newData, destination, draggableId);
      console.log(newData);

      dispatch(onDrag(newData))
    }
    if (res.type === "COLUMN") {
      let columnOrder = [...todos.columnOrder];
      columnOrder.splice(source.index, 1);
      columnOrder.splice(destination.index, 0, draggableId);
      todos.columnOrder = columnOrder;
      dispatch(onDrag({ ...todos }))
    }
  };

  return (
    <>
      <div className={styles.taskContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          <XDrop
            className={styles.drop}
            droppableId="all-columns"
            type="COLUMN"
            direction="horizontal"
          >
            {todos.columnOrder.map((columnId: any, index: number) => {
              const column = todos.columns[columnId];
              const tasks = column.taskIds.map((taskId: any) => todos.tasks[taskId]);
              return (
                <XDrag
                  key={columnId}
                  draggableId={columnId}
                  index={index}
                  dragAll={false}
                >
                  <XColumn column={column} tasks={tasks} />
                </XDrag>
              );
            })}
          </XDrop>
        </DragDropContext>

      </div>
      {isOpenModal && <Modal setIsModalOpen={setIsModalOpen} />}

    </>


  );
};



export default Home;
