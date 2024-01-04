import { FC, useEffect } from "react";

// styles and other things
import styles from '../styles/components/modal.module.scss';
import { AuthUserDetails, HeaderPropsInterface, TodoInterface } from "../interface/interface";
import { STRING } from "../config/string";
import InputField from "./InputField";
import { useFormik } from "formik";
import LocalstorageService from "../config/localstorage-services";
import { useDispatch } from "react-redux";
import { createTodo } from "../middleware/todo";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { createEditTodo, resetEdit, resetMessage } from "../slice/todo.slice";


const Modal: FC<HeaderPropsInterface> = ({
  setIsModalOpen,
}) => {

  const data: AuthUserDetails = LocalstorageService.getLoggedInUserDetails();
  const userName = data?.name ? data.name[0] : ''
  const dispatch = useDispatch();
  const {
    createTodoMessage,
    isCreateTodoLoading,
    editTodoMessage,
    createTodoError, editTodo
  } = useSelector((state: any) => state.todo);

  const isEditMode = !!editTodo;
  useEffect(() => {
    if (createTodoMessage) {
      formik.resetForm();
    }
    if (createTodoError) {
      toast.error("Something went wrong!");
      formik.setSubmitting(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateTodoLoading, createTodoMessage]);



  useEffect(() => {
    if (editTodo) {
      const {taskTitle,content} = editTodo.task;
      formik.setValues({
        taskTitle,
        content,
        status:editTodo?.column.id
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTodo]);



  const handleTodoSubmit = (values: TodoInterface) => {
    const { taskTitle, content } = values;
    const newTask: TodoInterface = {
      taskTitle,
      content,
      username: userName
    };
    if (editTodo) {
      const payload = {
        editTodo,
        values
      }
      dispatch(createEditTodo(payload))
    } else {
      dispatch(createTodo(newTask))
      setIsModalOpen(false);
    }

  }

    // edit succesffully
    useEffect(() => {
      if (editTodoMessage) {
        toast.success(editTodoMessage)
        dispatch(resetMessage())
        handleClose()
      }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [editTodoMessage]);

  // initial values
  const initialValues: TodoInterface = {
    taskTitle: "",
    content: "",
    status: "",
  };

  const todoValidationSchema = Yup.object().shape({
    taskTitle: Yup.string().required("Title is required"),
    status: isEditMode ? Yup.string().required('Status is required') : Yup.string(),
  });

  const handleClose = () => {
    setIsModalOpen(false)
    dispatch(resetEdit())
  }

  // formik setup
  const formik = useFormik({
    initialValues,
    validationSchema: todoValidationSchema,
    onSubmit: handleTodoSubmit,
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <>
      <div onClick={handleClose} className={styles.darkBG} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          {/* modal header start */}
          <div className={styles.modalHeader}>
            <span className={styles.title}>{editTodo ? STRING.EDIT_TASK : STRING.CREATE_TASK}</span>
            <span onClick={handleClose} className={styles.closeContainer}>&times;</span>
          </div>
          {/* modal header end */}


          <div className={styles.modalContent}>
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Title Field start */}
              <InputField
                label="Title"
                name="taskTitle"
                type="text"
                placeholder="Enter Title"
                value={values.taskTitle}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.taskTitle}
                touched={touched.taskTitle}
              />
              {/* Title Field end */}

              {editTodo && ( // Render dropdown only if editTodo exists
                <div className={styles.inputContainer}>
                  <label htmlFor="status" className={styles.label}>
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.input}
                  >
                    <option value="">Select Status</option>
                    <option value="column-1">To Do</option>
                    <option value="column-2">In Progress</option>
                    <option value="column-3">Done</option>
                  </select>
                  {errors.status && touched.status && (
                    <div className={styles.error}>{errors.status}</div>
                  )}
                </div>
              )}

              {/* Description Field start */}
              <InputField
                label="Description"
                name="content"
                type="textarea"
                placeholder="Enter Description"
                value={values.content}
                onBlur={handleBlur}
                onChange={handleChange}

              />
              {/* Description Field end */}


              <button type="submit" className={styles.button}>
                {formik.isSubmitting ? "Loading..." : "Submit"}
              </button>

            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
