import React, { FC, ReactNode } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

import styles from '../assets/components/drop.module.scss'


interface IXDrop extends Omit<DroppableProps, "children"> {
  children: ReactNode;
  className?: string;
}

const XDrop: FC<IXDrop> = ({ children, className, ...props }) => {
  return (
    <Droppable  {...props}>
      {(provided, snapshot) => (
        <div
          {...provided.innerRef}
          ref={provided.innerRef}
          className={className}
          data-is-color={snapshot.isDraggingOver}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default XDrop;
