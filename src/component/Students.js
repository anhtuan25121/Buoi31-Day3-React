import React, { useEffect, useState } from 'react'
import Add from "./Add"
import Student from './Student'
import Footer from './Footer'
import { Container, ListGroup } from 'reactstrap'

export default function Students() {
    const [flag, setFlag] = useState("")
    const [checkAll, setcheckAll] = useState(false)

    const [list, setList] = useState([
        {
            id: 1,
            name: "Le Meo",
            checked: true
        },
        {
            id: 2,
            name: "Le Tho",
            checked: true
        },
        {
            id: 3,
            name: "Le Nai",
            checked: false
        },
        {
            id: 4,
            name: "Le Ho",
            checked: false
        }
    ])

    useEffect(()=>{
        if(localStorage.getItem("list")){
            setList(JSON.parse(localStorage.getItem("list")))
        }
    })
    const rename=(id, name)=>{
        let newList = list.map(stud=> stud.id===id?{...stud, name:name}:stud)
        setList(newList)//list = newList
        localStorage.setItem("list", JSON.stringify(newList))
    }
    const deletebyId = (id) => {
        const newList = list.filter(stud => stud.id !== id)
        setList(newList)
        localStorage.setItem("list", JSON.stringify(newList))
    }
    const reChecked = (id) => {
        let newList = list.map((stud => stud.id === id ? { ...stud, checked: !stud.checked } : stud))
        setList(newList)
        localStorage.setItem("list", JSON.stringify(newList))
    }
    const addNewStudent = (name) => {
        let idMax = list.reduce((max_value, stud) => Math.max(max_value, stud.id), -Infinity);
        const newList = [...list, { id: idMax + 1, name: name, checked: false }]
        setList(newList);
        localStorage.setItem("list", JSON.stringify(newList))
    };
    const filterStudents = (list, flag) => {
        if (flag == "CHECK") {
            return list.filter(stud => stud.checked)
        }
        else if (flag == "NOCHECK") {
            return list.filter(stud => !stud.checked)
        }
        else if (flag == "DELETEALL") {
            const newList = list.filter(student => student.checked == false)
            setList(newList)
            localStorage.setItem("list", JSON.stringify(newList))
            setFlag("")
            
        }
        else if (flag == "CHECKALL") {
            const newList =list.map(student => ({ ...student, checked: !checkAll }))
            setList(newList);
            localStorage.setItem("list", JSON.stringify(newList))
            setcheckAll(!checkAll);
            setFlag("");
        }
        return list;
    }
    return (
        <div>
            <Container className='w-50 text-center p-5 my-5'>
                <h1 className='title'>Student List</h1>
                <Add addNewStudent={addNewStudent} />
                <ListGroup>
                    {
                        filterStudents(list, flag).map((stud, index) => (<Student key={index} student={stud}
                            deletebyId={deletebyId} reChecked={reChecked} rename={rename}
                        />))
                    }
                </ListGroup>
                <Footer setFlag={setFlag} checkAll={checkAll} setcheckAll={setcheckAll}/>
            </Container>
        </div>
    )
}
