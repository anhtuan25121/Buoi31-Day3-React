import React, { useState } from 'react';
import { Button, ListGroupItem, Input } from 'reactstrap';

export default function Student(props) {
    const { student, deletebyId, reChecked, rename } = props;
    const [isEdit, setIsEdit] = useState(false)
    const [text, setText] = useState(student.name)
    
    return (
        <ListGroupItem className='student-item'>
            <Input className="checked_box" type="checkbox" checked={student.checked} onChange={() => reChecked(student.id)} />
            <div className={student.checked ? "student-name active" : "student-name"} onClick={() => reChecked(student.id)}>
                {
                    !isEdit ? <p onDoubleClick={() => setIsEdit(true)}>{student.name}</p> :
                        <Input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                setIsEdit(false)
                                rename(student.id, text)
                            }
                        }}
                        />
                }
            </div>
            <Button className="btn-danger mx-3" onClick={() => deletebyId(student.id)}>
                <i className='fa-solid fa-close '></i>
            </Button>
        </ListGroupItem>
    );
}
