import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const MyTodoList = () => {
    const myTodoLists = [
        {
            id: 'djfhdjhf',
            text: 'Hello text 1'
        },
        {
            id: 'dkfhydjkhfjd',
            text: 'Hello text 2'
        },
        {
            id: 'sakfjklsadjfklsdajf',
            text: 'Hello text 3'
        },
        {
            id: 'eruujtyhruijytir',
            text: 'Hello text 4'
        },
        {
            id: 'jhfnjmcxhvbjdhf',
            text: 'Hello text 5'
        },
    ]
    return (
        <div>
            <div className='text-center py-3'>
            <h2 className='text-2xl inline-block bg-[#FFDDD2] px-5 font-bold py-2 text-center'>My Todo List</h2>
            </div>
            <div className='grid grid-cols-3 gap-5'>



                {/* my to do list */}
                <DragDropContext>
                <div className='border p-5'>
                    <h3 className='text-center font-bold text-2xl border-b-2 pb-5'>To Do</h3>
                    <Droppable droppableId='myTodoLists'>
                        {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {
                            myTodoLists.map((list, indx) => {
                                return (<Draggable key={list?.id} draggableId={list?.id} index={indx}>
                                    {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='border mt-4 shadow'>
                                      <p className='text-center py-3 text-base font-medium'>{list?.text}</p>
                                       </div>
                            )}
                                </Draggable>
                                )
                            })
                        }

                    </div>
    )}
                    </Droppable>
                </div>
                </DragDropContext>
                {/* my ongoing tasks */}







                <div className='border p-5'>
                    <h3 className='text-center font-bold text-2xl border-b-2 pb-5'>Ongoing</h3>
                    <div>
                        <div className='border mt-4 shadow'>
                            <p className='text-center py-3 text-base font-medium'>Lorem ipsum dolor sit.</p>
                        </div>
                    </div>
                </div>
                {/* my completed tasks */}
                <div className='border p-5 '>
                    <h3 className='text-center font-bold text-2xl border-b-2 pb-5'>Completed</h3>
                    <div>
                        <div className='border mt-4'>
                            <p className='text-center py-3 text-base font-medium'>Lorem ipsum dolor sit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTodoList;