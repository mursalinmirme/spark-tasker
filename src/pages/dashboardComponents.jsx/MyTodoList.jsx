import React from 'react';

const MyTodoList = () => {
    return (
        <div>
            <div className='text-center py-3'>
            <h2 className='text-2xl inline-block bg-[#FFDDD2] px-5 font-bold py-2 text-center'>My Todo List</h2>
            </div>
            <div className='grid grid-cols-3 gap-5'>
                {/* my to do list */}
                <div className='border p-5'>
                    <h3 className='text-center font-bold text-2xl border-b-2 pb-5'>To Do</h3>
                    <div>
                        <div className='border mt-4 shadow'>
                            <p className='text-center py-3 text-base font-medium'>Lorem ipsum dolor sit.</p>
                        </div>
                        <div className='border mt-4 shadow'>
                            <p className='text-center py-3 text-base font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, vero.</p>
                        </div>
                    </div>
                </div>
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